import { User } from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { consts } from '../consts.js'

const controller = {
	CHECK_TOKEN: async (req, res, next) => {},
	LOGIN: async (req, res) => {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email }).lean().exec()

			const checkUser = password == '' || password == null || !user
			if (!checkUser) {
				if (bcrypt.compareSync(password, user.password)) {
					const token = jwt.sign(
						{ _id: user._id, email: user.email },
						consts.JWT_KEY,
						{ expiresIn: consts.JWT_EXPIRES }
					)
					delete user.password
					return res.status(200).send({ token, ...user })
				}
			} else {
				return res.status(500).send({ message: 'Wrong e-mail or password' })
			}
		} catch (error) {
			res.status(500).send({ error: error.message, message: 'Server error.' })
		}
	},
}

export default controller

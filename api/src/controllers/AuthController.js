import { User } from '../../models/User.js'
import bcrypt from 'bcryptjs'

const controller = {
	CHECK_TOKEN: async (req, res, next) => {},
	LOGIN: async (req, res) => {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email }).lean().exec()

			const checkUser = password == '' || password == null || !user
			if (!checkUser) {
				if (bcrypt.compareSync(password, user.password)) {
					delete user.password
					console.log(user)
					return res.status(200).send(user)
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

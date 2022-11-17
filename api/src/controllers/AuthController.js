import { User } from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { consts } from '../consts.js'

const controller = {
	CHECK_TOKEN: async (req, res) => {
		try {
			const token = req.get('Authorization')
			if (!token) {
				res.status(401).send({ message: 'Access denied, invalid token.' })
			}
			jwt.verify(token, consts.JWT_KEY, (err, decoded) => {
				if (err || !decoded) {
					return res.status(401).json({ message: 'Authentication error!' })
				}
				return res.status(200).send({ token })
			})
		} catch (error) {
			res.status(500).send({ message: 'Server error.' })
		}
	},
	LOGIN: async (req, res) => {
		try {
			const { email, password, token } = req.body

			const user = await User.findOne({ email }).lean().exec()
			const checkUser = password == '' || password == null || !user

			let checkToken
			if (token) {
				jwt.verify(token, consts.JWT_KEY, (err, decoded) => {
					if (err || !decoded) {
						return res.status(401).json({ message: 'Authentication error!' })
					}
					checkToken = true
				})
			}

			if (!checkUser || checkToken) {
				let checkPass
				if (password) checkPass = bcrypt.compareSync(password, user.password)
				if (checkPass || checkToken) {
					const token = jwt.sign(
						{ _id: user._id, email: user.email },
						consts.JWT_KEY,
						{ expiresIn: consts.JWT_EXPIRES }
					)
					delete user.password
					return res.status(200).send({ token, ...user })
				}
			} else {
				return res.status(400).send({ message: 'Wrong e-mail or password' })
			}
		} catch (error) {
			res.status(500).send({ message: 'Server error.' })
		}
	},
}

export default controller

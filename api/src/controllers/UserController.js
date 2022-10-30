import { User } from '../../models/User.js'
import bcrypt from 'bcryptjs'
import { consts } from '../consts.js'

const controller = {
	CREATE_USER: async (req, res) => {
		try {
			const { name, email, address, password } = req.body
			const alreadyExists = await User.findOne({ name, email }).exec()

			if (!alreadyExists) {
				const user = new User({ name, email, address, password })

				// Encrypt the password
				const hash = await bcrypt.hash(password, consts.BCRYPT_SALT)
				user.password = hash

				user.save((err, user) => {
					err
						? res.status(500).send({
								error: err.message,
								message: 'Error while saving the user.',
						  })
						: res.status(201).send(user)
				})
			} else {
				res.status(500).send({
					message: 'Wrong e-mail or password.',
				})
			}
		} catch (error) {
			res.status(500).send({
				error: error.message,
				message: 'Error while creating the user.',
			})
		}
	},
	EDIT_USER: async (req, res) => {
		try {
			const { id, name, email, address, password } = req.body
			const user = await User.findById(id).exec()

			const checkUser = password == '' || password == null || !user
			if (!checkUser) {
				// Check password
				if (bcrypt.compareSync(password, user.password)) {
					const updatedUser = await User.findOneAndUpdate(
						{ _id: id },
						{ name, email, address },
						{ new: true }
					)
					return res.status(200).send(updatedUser)
				}
			} else {
				return res.status(500).send({ message: 'Wrong e-mail or password.' })
			}
		} catch (error) {
			res.status(500).send({ error: error.message, message: 'Server error.' })
		}
	},
	DELETE_USER: async (req, res) => {
		try {
		} catch (error) {}
	},
}

export default controller

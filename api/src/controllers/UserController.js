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
				bcrypt.genSalt(consts.BCRYPT_SALT, (err, salt) => {
					bcrypt.hash(user.password, salt, (err, hash) => {
						user.password = hash
					})
				})

				user.save((err, usr) => {
					err
						? res.status(500).send({
								error: err.message,
								message: 'Error while saving the user.',
						  })
						: res.status(201).send(usr)
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
		} catch (error) {}
	},
	DELETE_USER: async (req, res) => {
		try {
		} catch (error) {}
	},
}

export default controller

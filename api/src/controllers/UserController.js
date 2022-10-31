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

				user.save((err, usr) => {
					if (err) {
						return res.status(500).send({
							error: err.message,
							message: 'Error while saving the user.',
						})
					} else {
						// Need to convert the user to a js object to be able to delete password property
						const userCreated = usr.toObject()
						delete userCreated.password
						res.status(201).send(userCreated)
					}
				})
			} else {
				res.status(400).send({
					message: 'This account already exists.',
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
			const user = await User.findById(id).lean().exec()

			const alreadyExists = await User.findOne({ email }).exec()
			const checkUser = password == '' || password == null || !user
			if (!alreadyExists) {
				if (!checkUser) {
					// Check password
					if (bcrypt.compareSync(password, user.password)) {
						const updatedUser = await User.findOneAndUpdate(
							{ _id: id },
							{ name, email, address },
							{ new: true }
						)
						delete updatedUser.password
						return res.status(200).send(updatedUser)
					}
				} else {
					return res.status(400).send({ message: 'Wrong e-mail or password.' })
				}
			} else {
				return res.status(400).send({ message: 'E-mail unavailable.' })
			}
		} catch (error) {
			res.status(500).send({ message: 'Server error.' })
		}
	},
	DELETE_USER: async (req, res) => {
		try {
			const { id, password } = req.body
			const user = await User.findById(id).exec()

			const checkPassword = password == '' || password == null || !user
			if (!checkPassword) {
				// Check password
				if (bcrypt.compareSync(password, user.password)) {
					await User.findByIdAndDelete(id, (err, usr) => {
						if (err) {
							return res
								.status(500)
								.send({ message: 'Error while deleting the user.' })
						} else {
							return res.status(200).send({ message: 'User deleted.' })
						}
					}).clone()
				}
			} else {
				return res.status(400).send({ message: 'Wrong password.' })
			}
		} catch (error) {
			console.log(error)
			res.status(500).send({ message: 'Server error.' })
		}
	},
}

export default controller

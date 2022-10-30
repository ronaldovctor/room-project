import { User } from '../../models/User.js'

const controller = {
	CREATE_USER: async (req, res) => {
		try {
			const { name, email, address, password } = req.body
			const alreadyExists = await User.findOne({ name, email }).exec()

			if (!alreadyExists) {
				const user = new User({ name, email, address, password })
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
	EDIT_USER: async (req, res) => {},
	DELETE_USER: async (req, res) => {},
}

export default controller

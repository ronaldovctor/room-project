import { app } from './app.js'
import mongoose from 'mongoose'
import { consts } from './consts.js'

mongoose
	.connect(consts.ATLAS_CONNECTION)
	.then(() => app.listen(5000, () => 'server running - port: 5000'))
	.catch((err) => console.error(err.message))

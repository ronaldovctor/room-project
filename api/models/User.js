import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = Schema({
	name: String,
	email: String,
	address: String,
	password: String,
})

const User = mongoose.model('User', UserSchema)

export { User }

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import token from './token.js'
import user from './user.js'

const reducer = combineReducers({ token, user })
const store = configureStore({
	reducer: reducer,
	middleware: [thunk],
})

export default store

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import user from './user.js'

const reducer = combineReducers({ user })
const store = configureStore({
	reducer: reducer,
	middleware: [thunk],
})

export default store

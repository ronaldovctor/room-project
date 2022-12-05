import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import user from './user.js'
import ui from './ui.js'

const reducer = combineReducers({ user, ui })
const store = configureStore({
	reducer: reducer,
	middleware: [thunk],
})

export default store

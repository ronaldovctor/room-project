import createAsyncSlice from './helper/createAsyncSlice'
44
import { USER_CREATE, USER_EDIT, USER_LOGIN } from '../api/api.js'
import { fetchToken, resetTokenState } from './token'

const user = createAsyncSlice({
	name: 'user',
	fetchConfig: (user) => USER_LOGIN(user),
	reducers: {
		updateFav(state, action) {
			state.data.favorites = action.payload
		},
	},
})

export const fetchUser = user.asyncAction
export const { resetState: resetUserState, fetchError, updateFav } = user.actions

export const autoLogin = () => async (dispatch) => {
	try {
		const email = window.localStorage.getItem('email')
		const token = window.localStorage.getItem('token')
		if (email && token) {
			const { payload } = await dispatch(fetchToken(token))
			if (payload) {
				const { type } = await dispatch(fetchUser({ email, token }))
				if (type === fetchError.type) dispatch(userLogout())
			}
		}
	} catch (error) {
		throw new Error(error.message)
	}
}

export const userLogout = () => async (dispatch) => {
	try {
		dispatch(resetUserState())
		dispatch(resetTokenState())
		window.localStorage.removeItem('token')
		window.localStorage.removeItem('email')
	} catch (error) {
		throw new Error(error.message)
	}
}

export default user.reducer

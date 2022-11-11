import createAsyncSlice from './helper/createAsyncSlice'
44
import { USER_CREATE, USER_EDIT, USER_LOGIN } from '../api/api.js'
import useFetch from '../hooks/useFetch'

const user = createAsyncSlice({
	name: 'user',
	fetchConfig: (user) => USER_LOGIN(user),
})

export const fetchUser = user.asyncAction

export const autoLogin = (configs) => async (dispatch) => {
	try {
		const { payload } = await dispatch(fetchToken(window.localStorage.getItem('token')))
		if (payload) await dispatch(fetchUser(configs))
	} catch (error) {
		throw new Error(error.message)
	}
}

export const editUser = (configs) => async (dispatch) => {
	const { data, request } = useFetch()
	try {
		const { payload } = await dispatch(fetchToken(window.localStorage.getItem('token')))
		if (payload) await request(USER_EDIT(configs))
		await dispatch(fetchUser(data))
	} catch (error) {
		throw new Error(error.message)
	}
}

export default user.reducer

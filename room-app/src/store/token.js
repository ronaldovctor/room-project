import { VALIDATE_TOKEN } from '../api/api'
import createAsyncSlice from './helper/createAsyncSlice'
import getLocalStorage from './helper/getLocalStorage'

const token = createAsyncSlice({
	name: 'token',
	initialState: {
		data: {
			token: getLocalStorage('token', null),
		},
	},
	fetchConfig: (token) => VALIDATE_TOKEN(token),
	reducers: {
		updateToken(state, action) {
			state.data.token = action.payload
		},
	},
})

export const { updateToken } = token.actions

export const fetchToken = token.asyncAction
export default token.reducer

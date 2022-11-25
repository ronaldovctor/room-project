import { createSlice } from '@reduxjs/toolkit'

export const createAsyncSlice = (config) => {
	const slice = createSlice({
		name: config.name,
		initialState: {
			loading: false,
			data: null,
			error: null,
			...config.initialState,
		},
		reducers: {
			fetchStart(state) {
				state.loading = true
			},
			fetchSuccess(state, action) {
				state.loading = false
				state.data = action.payload
				state.error = null
			},
			fetchError(state, action) {
				state.loading = false
				state.data = null
				state.error = action.payload
			},
			...config.reducers,
		},
	})

	const { fetchStart, fetchSuccess, fetchError } = slice.actions

	const asyncAction = (payload) => async (dispatch) => {
		try {
			dispatch(fetchStart())
			const { url, options } = config.fetchConfig(payload)
			const response = await fetch(url, options)
			const data = await response.json()
			if (response.ok === false) throw new Error(data.message)
			return dispatch(fetchSuccess(data))
		} catch (error) {
			return dispatch(fetchError(error.message))
		}
	}

	return {
		...slice,
		asyncAction,
	}
}

export default createAsyncSlice

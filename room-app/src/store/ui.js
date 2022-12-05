import createAsyncSlice from './helper/createAsyncSlice'

const ui = createAsyncSlice({
	name: 'ui',
	initialState: {
		videoModal: false,
	},
	reducers: {
		openVideoModal(state) {
			state.videoModal = true
		},
		closeVideoModal(state) {
			state.videoModal = false
		},
	},
})

export const { openVideoModal, closeVideoModal } = ui.actions
export default ui.reducer

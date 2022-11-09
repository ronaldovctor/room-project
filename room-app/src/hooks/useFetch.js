import { useCallback, useState } from 'react'

function useFetch() {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	const request = useCallback(async (url, options) => {
		let response
		let json

		try {
			setLoading(true)
			setError(null)

			response = await fetch(url, options)
			json = await response.json()
		} catch (error) {
			json = null
			setError(error.message)
		} finally {
			setLoading(false)
			setData(json)
			return {
				response,
				json,
			}
		}
	}, [])

	return {
		loading,
		data,
		error,
		request,
	}
}

export default useFetch

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../store/user'
import { Loading } from '../helper/loading/Loading'

export function Logout() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(userLogout())
		navigate('/login')
	}, [])

	return <Loading />
}

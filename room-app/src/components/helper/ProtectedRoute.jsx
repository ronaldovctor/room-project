import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
	const { data } = useSelector((state) => state.user)
	// return data ? children : <Navigate to="/login" />
	return children
}

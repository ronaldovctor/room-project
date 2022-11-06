import { Routes, Route } from 'react-router-dom'
import { LoginForm } from './login-form/LoginForm'

export function Login() {
	return (
		<section>
			<Routes>
				<Route path="/" element={<LoginForm />} />
			</Routes>
		</section>
	)
}

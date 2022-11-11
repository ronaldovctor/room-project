import styles from './Login.module.scss'
import { Routes, Route } from 'react-router-dom'
import { LoginForm } from './login-form/LoginForm'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { LoginCreate } from './login-create/LoginCreate'

export function Login() {
	return (
		<section className={styles.forms}>
			<div className={styles.form}>
				<Logo />
				<Routes>
					<Route path="/" element={<LoginForm />} />
					<Route path="/criar" element={<LoginCreate />} />
				</Routes>
			</div>
		</section>
	)
}

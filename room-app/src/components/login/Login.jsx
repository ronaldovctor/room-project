import styles from './Login.module.scss'
import { Routes, Route } from 'react-router-dom'
import { LoginForm } from './login-form/LoginForm'

import bg from '../../assets/bg-login.jpg'
import { ReactComponent as Logo } from '../../assets/logo.svg'

export function Login() {
	return (
		<section className={styles.forms}>
			<div className={styles.form}>
				<Logo />
				<Routes>
					<Route path="/" element={<LoginForm />} />
				</Routes>
			</div>
			<div className={styles.bg}>
				<img src={bg} alt="Background" />
			</div>
		</section>
	)
}

import styles from './Login.module.scss'
import { Routes, Route } from 'react-router-dom'
import { LoginForm } from './login-form/LoginForm'

import bg from '../../assets/bg-login.jpg'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { LoginEdit } from './login-edit/LoginForm'

export function Login() {
	return (
		<section className={styles.forms}>
			<div className={styles.form}>
				<Logo />
				<Routes>
					<Route path="/" element={<LoginForm />} />
					<Route path="edit" element={<LoginEdit />} />
				</Routes>
			</div>
			<div className={styles.bg}>
				<img src={bg} alt="Background" />
			</div>
		</section>
	)
}

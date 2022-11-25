import styles from './Login.module.scss'
import { Routes, Route } from 'react-router-dom'
import { LoginForm } from './login-form/LoginForm'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { LoginCreate } from './login-create/LoginCreate'
import { LoginEdit } from './login-edit/LoginEdit'
import { useEffect } from 'react'

export function Login({ updateBg }) {
	useEffect(() => {
		updateBg()
	}, [])

	return (
		<section className={styles.forms}>
			<div className={styles.form}>
				<Logo />
				<Routes>
					<Route path="/" element={<LoginForm />} />
					<Route path="/criar" element={<LoginCreate />} />
					<Route path="/editar" element={<LoginEdit />} />
				</Routes>
			</div>
		</section>
	)
}

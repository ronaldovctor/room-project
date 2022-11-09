import styles from './LoginForm.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'

import { Input } from '../../forms/input/Input'
import { Envelope, Lock } from 'phosphor-react'
import { Button } from '../../forms/button/Button'
import useForm from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../store/user'
import { updateToken } from '../../../store/token'

export function LoginForm() {
	const email = useForm()
	const password = useForm()

	const { token, user } = useSelector((state) => state)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const loading = user.loading

	async function handleSubmit(event) {
		event.preventDefault()
		await dispatch(
			fetchUser({
				email: email.value,
				password: password.value,
			})
		)

		const newToken = user.data?.token
		window.localStorage.setItem('token', newToken)
		// navigate('/')
		await dispatch(updateToken(newToken))
		console.log(token.data.token)
	}

	return (
		<div className={styles.form}>
			<form onSubmit={handleSubmit}>
				<Input.Root label={'Email'} htmlFor={'email'}>
					<Input.Icon>
						<Envelope />
					</Input.Icon>
					<Input.Input
						name={'email'}
						type={'text'}
						placeholder={'usuario@email.com'}
						{...email}
					/>
				</Input.Root>
				<Input.Root label={'Senha'} htmlFor={'senha'}>
					<Input.Icon>
						<Lock />
					</Input.Icon>
					<Input.Input
						name={'senha'}
						type={'password'}
						placeholder={'***********'}
						{...password}
					/>
				</Input.Root>
				<NavLink className={styles.forgotPass}>Esqueceu a senha?</NavLink>
				<Button.root className={styles.button}>
					<Button.text
						text={`${loading ? 'Carregando' : 'Entrar'}`}
						disabled={loading}
					/>
				</Button.root>
			</form>
			<div className={styles.newAccountText}>
				<p>
					<NavLink>Novo por aqui?</NavLink> Crie agora mesmo sua conta, aproveite a
					RooM para assistir suas séries e filmes prediletos.
				</p>
			</div>
		</div>
	)
}

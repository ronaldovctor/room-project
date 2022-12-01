import { NavLink, useNavigate } from 'react-router-dom'

import { Input } from '../../forms/input/Input'
import { Envelope, Lock } from 'phosphor-react'
import { Button } from '../../forms/button/Button'
import useForm from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../store/user'
import { Error } from '../../helper/error/Error'
import { useState } from 'react'
import { useEffect } from 'react'

export function LoginForm() {
	const email = useForm('email')
	const password = useForm()

	const { user } = useSelector((state) => state)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const error = user.error
	const loading = user.loading

	async function handleSubmit(event) {
		event.preventDefault()
		if (email.validate() && password.validate()) {
			await dispatch(
				fetchUser({
					email: email.value,
					password: password.value,
				})
			)
		}
	}

	function setToken() {
		const newToken = user.data?.token
		window.localStorage.setItem('token', newToken)
		window.localStorage.setItem('email', user.data?.email)
		if (user.data) navigate('/')
	}

	useEffect(() => {
		if (user.data) setToken()
	}, [user])

	return (
		<>
			<h1 className="formTitle">Login</h1>
			<form onSubmit={handleSubmit}>
				<div className="formFields">
					<Input.Root label={'Email'} htmlFor={'email'} error={email.error}>
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
					<Input.Root label={'Senha'} htmlFor={'senha'} error={password.error}>
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
				</div>
				{/* <NavLink className="formForgotPass">Esqueceu a senha?</NavLink> */}
				{error && <Error error={'Dados incorretos.'} />}
				{loading ? (
					<Button.root className="formBtn" disabled>
						<Button.text text="Carregando..." />
					</Button.root>
				) : (
					<Button.root className="formBtn">
						<Button.text text="Entrar" />
					</Button.root>
				)}
			</form>
			<div className="formBottomText">
				<p>
					<NavLink to={'/login/criar'}>
						<strong>Novo por aqui?</strong>
					</NavLink>{' '}
					Crie agora mesmo sua conta, aproveite a <strong>RooM</strong> para assistir
					suas séries e filmes prediletos.
				</p>
			</div>
		</>
	)
}

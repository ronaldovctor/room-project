import { Navigate, NavLink, useNavigate } from 'react-router-dom'

import { Input } from '../../forms/input/Input'
import { Envelope, Lock } from 'phosphor-react'
import { Button } from '../../forms/button/Button'
import useForm from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { Error } from '../../helper/error/Error'
import useFetch from '../../../hooks/useFetch'
import { USER_CREATE } from '../../../api/api'
import { fetchUser } from '../../../store/user'
import { updateToken } from '../../../store/token'

export function LoginCreate() {
	const name = useForm('name')
	const address = useForm('address')
	const email = useForm('email')
	const password = useForm('')
	const { error, loading, request } = useFetch()
	const navigate = useNavigate()
	const { user } = useSelector((state) => state)
	const dispatch = useDispatch()

	async function handleSubmit(event) {
		event.preventDefault()
		if (
			name.validate() &&
			address.validate() &&
			email.validate() &&
			password.validate()
		) {
			const { url, options } = USER_CREATE({
				name: name.value,
				email: email.value,
				address: address.value,
				password: password.value,
			})
			const { response } = await request(url, options)
			if (response.ok) {
				await dispatch(
					fetchUser({
						email: email.value,
						password: password.value,
					})
				)
				const newToken = user.data?.token
				window.localStorage.setItem('token', newToken)
				navigate('/')
				await dispatch(updateToken(newToken))
			}
		}
	}

	return (
		<>
			<h1 className="formTitle">Criação</h1>
			<form onSubmit={handleSubmit}>
				<div className="formFields">
					<Input.Root label={'Nome completo'} htmlFor={'name'} error={name.error}>
						<Input.Icon>
							<Envelope />
						</Input.Icon>
						<Input.Input
							name={'name'}
							type={'text'}
							placeholder={'Carlos Alberto Costa'}
							{...name}
						/>
					</Input.Root>
					<Input.Root label={'Endereço'} htmlFor={'address'} error={address.error}>
						<Input.Icon>
							<Lock />
						</Input.Icon>
						<Input.Input
							name={'address'}
							type={'text'}
							placeholder={'RJ, Santos, Rua 1º de Abril'}
							{...address}
						/>
					</Input.Root>
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
				<NavLink className="formForgotPass">Esqueceu a senha?</NavLink>
				{error && <Error error={error} />}
				{!loading ? (
					<Button.root className="formBtn" disabled>
						<Button.text text="Criando..." />
					</Button.root>
				) : (
					<Button.root className="formBtn">
						<Button.text text="Criar Conta" />
					</Button.root>
				)}
			</form>
			<div className="formBottomText">
				<p>
					<NavLink to="/login">
						<strong>Possui uma conta?</strong>
					</NavLink>{' '}
					Entre agora mesmo e aproveite.
				</p>
			</div>
		</>
	)
}

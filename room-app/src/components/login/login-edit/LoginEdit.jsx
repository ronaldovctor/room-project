import { Envelope, Lock } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { USER_EDIT, VALIDATE_TOKEN } from '../../../api/api'
import useFetch from '../../../hooks/useFetch'
import useForm from '../../../hooks/useForm'
import { fetchToken, updateToken } from '../../../store/token'
import { editUser, fetchUser } from '../../../store/user'
import { Button } from '../../forms/button/Button'
import { Input } from '../../forms/input/Input'

export function LoginEdit() {
	const { user } = useSelector((state) => state)

	const name = useForm('name', user.data?.name)
	const address = useForm('address', user.data?.address)
	const email = useForm('email', user.data?.email)
	const password = useForm('')

	const navigate = useNavigate()

	const { loading, error, request } = useFetch()
	const dispatch = useDispatch()

	const [changed, setChanged] = useState(false)

	async function handleSubmit(event) {
		event.preventDefault()
		if (
			name.validate() &&
			address.validate() &&
			email.validate() &&
			password.validate()
		) {
			const localToken = window.localStorage.getItem('token')
			const { payload } = await dispatch(fetchToken(localToken))
			if (payload) {
				const { url, options } = USER_EDIT({
					id: user.data._id,
					name: name.value,
					address: address.value,
					email: email.value,
					password: password.value,
				})
				await request(url, options)
				if (!error) {
					const { payload } = await dispatch(
						fetchUser({
							email: user.data.email,
							password: password.value,
						})
					)
					if (payload) navigate('/')
				}
			}
		}
	}

	function setToken() {
		const newToken = user.data?.token
		window.localStorage.setItem('token', newToken)
		dispatch(updateToken(newToken))
	}

	useEffect(() => {
		setToken()
	}, [user.data])

	return (
		<>
			<h1 className="formTitle">Edição</h1>
			<form onSubmit={handleSubmit} onClick={() => setChanged(true)}>
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
							value={user.data?.email}
							{...email}
						/>
					</Input.Root>
					<i
						style={{
							width: '100%',
							height: '2px',
							backgroundColor: 'var(--white-c1)',
							borderRadius: '10px',
							margin: '.25rem 0',
						}}
					></i>
					<Input.Root label={'Senha atual'} htmlFor={'senha'} error={password.error}>
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
				<div
					style={{
						display: 'flex',
					}}
				>
					{error && <Error error={error} />}
					{!loading ? (
						<>
							<Button.root
								className="formBtn"
								type={'secondary'}
								onClick={() => navigate('/')}
								disabled
							>
								<Button.text text="Cancelar" />
							</Button.root>
							<Button.root className="formBtn" disabled>
								<Button.text text="Salvando..." />
							</Button.root>
						</>
					) : (
						<>
							<Button.root
								className="formBtn"
								type={'secondary'}
								onClick={() => navigate('/')}
							>
								<Button.text text="Cancelar" />
							</Button.root>
							<Button.root className="formBtn">
								<Button.text text="Salvar" />
							</Button.root>
						</>
					)}
				</div>
			</form>
		</>
	)
}

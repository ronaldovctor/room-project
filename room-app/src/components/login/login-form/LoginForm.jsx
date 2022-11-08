import styles from './LoginForm.module.scss'
import { NavLink } from 'react-router-dom'

import { Input } from '../../forms/input/Input'
import { Envelope, Lock, Play } from 'phosphor-react'
import { Button } from '../../forms/button/Button'

export function LoginForm() {
	function handleSubmit(event) {
		event.preventDefault()
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
					/>
				</Input.Root>
				<NavLink className={styles.forgotPass}>Esqueceu a senha?</NavLink>
				<Button.root className={styles.button}>
					<Button.text text={'Entrar'} />
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

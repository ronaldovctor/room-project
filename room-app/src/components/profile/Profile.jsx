import styles from './Profile.module.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Button } from '../forms/button/Button'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function Profile({ updateBg }) {
	useEffect(() => {
		updateBg()
	}, [])
	const { data } = useSelector((state) => state.user)
	const navigate = useNavigate()

	if (!data) return <Navigate to="/login" />

	return (
		<section className={styles.profile}>
			<div className={styles.infos}>
				<Logo />
				<h1 className="formTitle">Conta</h1>
				<div className={styles.field}>
					<p>
						Nome: <span>{data?.name}</span>
					</p>
				</div>
				<div className={styles.field}>
					<p>
						Endereço: <span>{data?.address}</span>
					</p>
				</div>

				<div className={styles.field}>
					<p>
						Email: <span>{data?.email}</span>
					</p>
				</div>
				<Button.root className={'formBtn'} onClick={() => navigate('/')}>
					<Button.text text={'Assistir'} />
				</Button.root>
			</div>
		</section>
	)
}

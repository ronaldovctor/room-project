import { NavLink } from 'react-router-dom'
import styles from './NotFound.module.scss'

export function NotFound() {
	return (
		<section className={styles.notFound}>
			<div className={styles.description}>
				<h1>Erro 404</h1>
				<p>
					Página não encontrada. <NavLink to={'/'}>Retornar para Home</NavLink> ou{' '}
					<NavLink to={'/login'}>Fazer Login</NavLink>
				</p>
			</div>
		</section>
	)
}

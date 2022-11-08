import styles from './Footer.module.scss'
import { ReactComponent as Logo } from '../../assets/logo-black.svg'

export function Footer() {
	return (
		<section className={styles.footer}>
			<div className={styles.infos}>
				<Logo /> <p>© 2022 RooM - Alguns Direitos Reservados.</p>
			</div>
		</section>
	)
}

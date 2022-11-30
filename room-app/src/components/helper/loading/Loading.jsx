import styles from './Loading.module.scss'

export function Loading() {
	return (
		<div className={styles.loading}>
			<p>Aguarde...</p>
			<div className={styles.loadingIcon}>
				<i></i>
			</div>
		</div>
	)
}

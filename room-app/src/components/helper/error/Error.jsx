import styles from './Error.module.scss'

export function Error({ error, className }) {
	return (
		<div className={`${styles.error} toTop ${className ? className : ''}`}>
			<p>{error}</p>
		</div>
	)
}

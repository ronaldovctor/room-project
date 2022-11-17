import styles from './Tags.module.scss'

function TagRoot({ children }) {
	return <div className={styles.root}>{children}</div>
}
function TagImdb({ score }) {
	return (
		<div className={styles.imdb}>
			<span>IMDb {score}</span>
		</div>
	)
}
function TagPg({ pg, size }) {
	let backgroundColor
	switch (pg) {
		case 10:
			backgroundColor = '#00a3ff'
			break

		case 12:
			backgroundColor = '#ebe005'
			break

		case 14:
			backgroundColor = '#d04b00'
			break

		case 16:
			backgroundColor = '#ff0000'
			break
		case 18:
			backgroundColor = '#000'
			break

		default:
			backgroundColor = '#0d7a15'
			break
	}

	return (
		<div
			className={`${styles.pg} ${size ? styles.sm : ''}`}
			style={{ backgroundColor }}
		>
			<span>{pg}</span>
		</div>
	)
}

export const Tag = {
	root: TagRoot,
	imdb: TagImdb,
	pg: TagPg,
}

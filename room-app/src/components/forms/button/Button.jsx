import styles from './Button.module.scss'

function ButtonRoot({ children, className, type, size }) {
	return (
		<button
			className={`${styles.button} ${className} ${
				type === 'secondary' ? styles.secondary : ''
			} ${size === 'lg' ? styles.lg : ''}`}
		>
			{children}
		</button>
	)
}

function ButtonText({ text }) {
	return <span className={styles.text}>{text}</span>
}

function ButtonIcon({ children }) {
	return <div className={styles.icon}>{children}</div>
}

export const Button = {
	root: ButtonRoot,
	text: ButtonText,
	icon: ButtonIcon,
}

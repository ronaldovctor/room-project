import styles from './Input.module.scss'

function InputRoot({ children }) {
	return <div className={styles.inputRoot}>{children}</div>
}

function InputInput() {
	return <input className={styles.inputInput} type="text" />
}

function InputIcon({ children }) {
	return <div className={styles.inputIcon}>{children}</div>
}

export const Input = {
	Root: InputRoot,
	Input: InputInput,
	Icon: InputIcon,
}

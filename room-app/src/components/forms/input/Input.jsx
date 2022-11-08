import styles from './Input.module.scss'

function InputRoot({ children, label, htmlFor }) {
	return (
		<>
			<label className={styles.label} htmlFor={htmlFor}>
				{label}:
			</label>
			<div className={styles.inputRoot}>{children}</div>
		</>
	)
}

function InputInput({ name, type, placeholder }) {
	return (
		<input
			className={styles.inputInput}
			name={name}
			id={name}
			type={type}
			placeholder={placeholder}
		/>
	)
}

function InputIcon({ children }) {
	return <div className={styles.inputIcon}>{children}</div>
}

export const Input = {
	Root: InputRoot,
	Input: InputInput,
	Icon: InputIcon,
}

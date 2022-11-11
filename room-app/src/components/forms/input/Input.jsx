import { Error } from '../../helper/error/Error'
import styles from './Input.module.scss'

function InputRoot({ children, label, htmlFor, error }) {
	return (
		<div className={styles.root}>
			<label className={styles.label} htmlFor={htmlFor}>
				{label}:
			</label>
			<div className={styles.inputRoot}>{children}</div>
			{error && <Error error={error} className={styles.error} />}
		</div>
	)
}

function InputInput({ name, type, placeholder, value, onChange, onBlur }) {
	return (
		<input
			className={styles.inputInput}
			name={name}
			id={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
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

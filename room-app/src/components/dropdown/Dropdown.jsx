import { useNavigate } from 'react-router-dom'
import styles from './Dropdown.module.scss'

export function Dropdown({ options, isOpen, setLine, width, className }) {
	const navigate = useNavigate()

	return (
		<ul
			className={`${styles.dropdown} ${isOpen ? styles.active : ''} ${className}`}
			style={
				width !== undefined
					? {
							width: `${width}`,
					  }
					: null
			}
		>
			{options.map((option, index) => (
				<li
					key={index + 56}
					className={index === options.length - 3 && setLine ? styles.setLine : ''}
					onClick={() => navigate(option.link)}
				>
					<p>{option.label}</p>
				</li>
			))}
		</ul>
	)
}

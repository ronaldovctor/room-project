import styles from './Dropdown.module.scss'

export function Dropdown({ options, isOpen, setLine, width }) {
	return (
		<ul
			className={`${styles.dropdown} ${isOpen ? styles.active : ''}`}
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
					key={option}
					className={index === options.length - 3 && setLine ? styles.setLine : ''}
				>
					<p>{option}</p>
				</li>
			))}
		</ul>
	)
}

import styles from './Search.module.scss'
import { Dropdown } from '../dropdown/Dropdown'

import { MagnifyingGlass } from 'phosphor-react'

export function Search() {
	const search = ['John Wick 3', 'Avatar', 'End Game', 'Interstellar']

	return (
		<div className={styles.search}>
			<button>
				<MagnifyingGlass />
			</button>
			<input type="text" placeholder="Encontre seu show..." />
			<Dropdown isOpen={false} setLine={false} options={search} width="100%" />
		</div>
	)
}

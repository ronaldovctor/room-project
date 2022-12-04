import styles from './Search.module.scss'
import { Dropdown } from '../dropdown/Dropdown'
import data from '../../../public/data.json'

import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export function Search() {
	const navigate = useNavigate()

	const [inputValue, setInputValue] = useState('')
	const [searchedTerms, setSearchedTerms] = useState()
	const dataItems = useMemo(() => data.map((item) => ({ name: item.name, id: item.id })))

	function handleInput({ target }) {
		const inputValue = target.value
		setInputValue(inputValue)
		let names
		if (inputValue) {
			names = dataItems.filter((item) =>
				item.name.toLowerCase().includes(inputValue.toLowerCase())
			)
		} else setSearchedTerms([])
		if (names) setSearchedTerms(names.slice(0, 6))
	}

	function handleSearch() {
		navigate(`/category/?search=${inputValue}`)
	}

	return (
		<div className={styles.search}>
			<button onClick={handleSearch}>
				<MagnifyingGlass />
			</button>
			<input
				type="text"
				placeholder="Encontre seu show..."
				value={inputValue}
				onChange={handleInput}
			/>
			{searchedTerms && (
				<ul className={styles.searchResult}>
					{searchedTerms.map((term) => (
						<li key={term.name} className={styles.term}>
							<NavLink to={`/content/?search=${term.id}`}>{term.name}</NavLink>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

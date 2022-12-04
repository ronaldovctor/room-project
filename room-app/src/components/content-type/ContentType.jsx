import { useEffect } from 'react'
import { Header } from '../../page/header/Header'
import { Card } from '../card/Card'
import styles from './ContentType.module.scss'
import data from '../../../public/data.json'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function ContentType({ updateBg }) {
	const { user } = useSelector((state) => state)

	const [searchParams, setSearchParams] = useSearchParams()
	const [filteredData, setFilteredData] = useState([])
	const [title, setTitle] = useState()

	const titles = {
		favorites: 'Favoritos',
		fantasy: 'Fantasia',
		action: 'Ação',
		adventure: 'Aventura',
		actionAdventure: 'Ação e Aventura',
		comedy: 'Comédia',
		drama: 'Drama',
		documentary: 'Documentário',
		terror: 'Terror',
		suspense: 'Suspense',
		movies: 'Filmes',
		series: 'Séries',
	}

	function filterData(filt) {
		switch (filt) {
			case 'favorites':
				filter('favorites')
			case 'fantasy':
			case 'action':
			case 'adventure':
			case 'comedy':
			case 'drama':
			case 'documentary':
			case 'terror':
			case 'suspense':
			case 'all':
				filter(filt)
				break
			default:
				filter()
				break
		}
	}

	async function filter(fil) {
		switch (fil) {
			case 'favorites':
				if (user.data?.favorites)
					await setFilteredData(
						data.filter((item) => user.data?.favorites.includes(item.id))
					)
				else setFilteredData([])
				break
			case 'fantasy':
			case 'action':
			case 'adventure':
			case 'comedy':
			case 'drama':
			case 'documentary':
			case 'terror':
			case 'suspense':
				await setFilteredData(data.filter((item) => item.category == fil))
				break
			case 'all':
				await setFilteredData(data)
				break
			default:
				const related = data.filter((item) =>
					item.name.toLowerCase().includes(searchParams.get('search').toLowerCase())
				)
				await setFilteredData(related)
				break
		}
	}

	useEffect(() => {
		const actualSearch = searchParams.get('search')
		filterData(actualSearch)
		if (titles[actualSearch]) setTitle(titles[actualSearch])
		else setTitle(`Resultado da busca para: "${actualSearch}"`)
	}, [searchParams])

	useEffect(() => {
		updateBg('home')
	}, [])

	return (
		<>
			<Header />
			<section className={styles.contentType}>
				<h1 className={styles.titleType}>{title}</h1>
				<div className={styles.cards}>
					{filteredData.length ? (
						filteredData.map((item, index) => (
							<div key={index + 76} className={styles.card}>
								<Card item={item} />
							</div>
						))
					) : (
						<h2>Não há itens adicionados.</h2>
					)}
				</div>
			</section>
		</>
	)
}

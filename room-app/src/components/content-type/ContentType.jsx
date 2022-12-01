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

	function filterData(filt) {
		switch (filt) {
			case 'favorites':
				filter('favorites')
				break
			case 'fantasy':
				filter('fantasy')
				break

			default:
				filter('all')
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
				await setFilteredData(data.filter((item) => item.category == 'fantasy'))
				break
			default:
				await setFilteredData(data)
				break
		}
	}

	useEffect(() => {
		updateBg('home')
		filterData(searchParams.get('search'))
	}, [searchParams])

	return (
		<>
			<Header />
			<section className={styles.contentType}>
				<h1 className={styles.titleType}>Título página</h1>
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

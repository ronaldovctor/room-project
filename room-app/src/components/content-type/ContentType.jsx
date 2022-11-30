import { useEffect } from 'react'
import { Header } from '../../page/header/Header'
import { Card } from '../card/Card'
import styles from './ContentType.module.scss'
import data from '../../../public/data.json'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../helper/loading/Loading'

export function ContentType({ updateBg }) {
	const { user } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [searchParams, setSearchParams] = useSearchParams()
	// const [filter, setFilter] = useState()
	const [filteredData, setFilteredData] = useState()

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
				await setFilteredData(
					data.filter((item) => user.data?.favorites.includes(item.id))
				)
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
		// setFilter(searchParams.get('search'))
		// setFilteredData([])
		filterData(searchParams.get('search'))
	}, [searchParams])

	if (!filteredData) return <Loading />

	return (
		<>
			<Header />
			<section className={styles.contentType}>
				<h1 className={styles.titleType}>Título página</h1>
				<div className={styles.cards}>
					{filteredData.map((item, index) => (
						<div key={index + 76} className={styles.card}>
							<Card item={item} />
						</div>
					))}
				</div>
			</section>
		</>
	)
}

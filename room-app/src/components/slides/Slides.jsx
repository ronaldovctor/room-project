import styles from './Slides.module.scss'
import { useEffect, useRef } from 'react'
import { Slide } from './slide/Slide'
import useFetch from '../../hooks/useFetch'

export function Slides({ categories }) {
	const slides = useRef(null)

	const { loading, data, request } = useFetch()
	async function fetchContent() {
		await request('./data.json')
	}

	useEffect(() => {
		fetchContent()
	}, [])

	if (loading) return null

	return (
		<section className={`${styles.slides}`} ref={slides}>
			{categories.map((categorie) => (
				<div key={categorie}>
					<h1 style={{ color: 'white' }}>{categorie}</h1>
					<Slide parentRef={slides} content={data} />
				</div>
			))}
		</section>
	)
}

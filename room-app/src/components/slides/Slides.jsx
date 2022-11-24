import styles from './Slides.module.scss'
import { useRef } from 'react'
import { Slide } from './slide/Slide'
import { NavLink } from 'react-router-dom'

export function Slides({ categories, data }) {
	const slides = useRef(null)

	return (
		<section className={`${styles.slides}`} ref={slides}>
			{categories.map((categorie) => (
				<div key={categorie} className={styles.categorie}>
					<div className={styles.name}>
						<h1>{categorie}</h1>
						<NavLink>veja mais</NavLink>
					</div>
					<Slide parentRef={slides} data={data} />
				</div>
			))}
		</section>
	)
}

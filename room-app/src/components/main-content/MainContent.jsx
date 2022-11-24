import { Button } from '../forms/button/Button'
import styles from './MainContent.module.scss'

import { FilmStrip, Play, Plus, ThumbsUp } from 'phosphor-react'
import { ContentDetails } from '../content-details/ContentDetails'
import { useEffect, useState } from 'react'
import { useRef } from 'react'

export function MainContent({ data }) {
	const [main, setMain] = useState(null)
	const title = useRef(null)

	function formatTitle(name) {
		const nameLetters = name.split(' ')
		let html = nameLetters
			.map((word) => {
				return `${
					word[0] !== word[0].toUpperCase() || !isNaN(word[0])
						? word[0]
						: `<span>${word[0]}</span>`
				}${word.slice(1)} `
			})
			.join('')
		let interval = setInterval(() => {
			if (title.current) {
				title.current.innerHTML = html
				clearInterval(interval)
			}
			console.log('passss...')
		}, 200)
	}

	useEffect(() => {
		setMain(data)
		formatTitle(data.name)
	}, [data])

	return (
		<section className={`${styles.mainContent} ${!main ? styles.empty : ''}`}>
			{main && (
				<>
					<div className={styles.content}>
						<div className={styles.movie}>
							<div className={styles.title}>
								<h1 className={styles.name} ref={title}></h1>
								<ContentDetails
									data={{
										imdb: main.imdb,
										pg: main.pg,
										year: main.year,
										category: main.category,
										size: main.size,
									}}
								/>
							</div>
							<div className={styles.description}>
								<p>{main.synopsis}</p>
							</div>
							<div className={styles.options}>
								<Button.root size="lg">
									<Button.icon>
										<Play weight="fill" />
									</Button.icon>
									<Button.text text={'Play'} />
								</Button.root>
								<Button.root size="lg" type="secondary">
									<Button.icon>
										<FilmStrip weight="regular" />
									</Button.icon>
									<Button.text text={'Trailer'} />
								</Button.root>
								<Button.root size="lg" rounded>
									<Button.icon>
										<Plus weight="bold" />
									</Button.icon>
								</Button.root>
								<Button.root size="lg" type="secondary" rounded>
									<Button.icon>
										<ThumbsUp color={`var(--pink-c1)`} weight="fill" />
									</Button.icon>
								</Button.root>
							</div>
						</div>
					</div>
					<div className={styles.bg}>
						<img src={main.src} alt="Conteúdo destaque" />
					</div>
				</>
			)}
		</section>
	)
}

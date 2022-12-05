import { Button } from '../forms/button/Button'
import styles from './MainContent.module.scss'
import { Check, FilmStrip, Play, Plus, ThumbsUp } from 'phosphor-react'
import { ContentDetails } from '../content-details/ContentDetails'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADD_FAV, REMOVE_FAV } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateFav, userLogout } from '../../store/user'
import { openVideoModal, closeVideoModal } from '../../store/ui'
import useFetch from '../../hooks/useFetch'

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
		}, 200)
	}

	const navigate = useNavigate()

	const { user } = useSelector((state) => state)
	const favorites = user.data?.favorites ? user.data?.favorites : []
	const { request } = useFetch()
	const dispatch = useDispatch()
	const [favState, setFavState] = useState()

	async function addFav(favorite) {
		setFavState(true)
		const { url, options } = ADD_FAV(
			{ id: user.data?._id, email: user.data?.email },
			favorite
		)
		const { error } = await request(url, options)
		if (user.data?.favorites) dispatch(updateFav([...user.data?.favorites, favorite]))
		else dispatch(updateFav([favorite]))

		if (error) dispatch(userLogout())
	}

	async function removeFav(favorite) {
		setFavState(false)
		const { url, options } = REMOVE_FAV(
			{ id: user.data?._id, email: user.data?.email },
			favorite
		)
		const { error } = await request(url, options)
		dispatch(updateFav([...user.data?.favorites.filter((item) => item != favorite)]))
		if (error) dispatch(userLogout())
	}

	function handleFav() {
		if (!favState) {
			setFavState(true)
			addFav(main.id)
		} else {
			setFavState(false)
			removeFav(main.id)
		}
	}

	function playVideo() {
		dispatch(openVideoModal())
	}

	useEffect(() => {
		setMain(data)
		formatTitle(data.name)
		favorites.includes(data.id) && setFavState(true)
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
								<Button.root
									size="lg"
									onClick={() => {
										navigate(`/content/?search=${main.id}`)
										dispatch(openVideoModal())
									}}
								>
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
								<Button.root size="lg" rounded onClick={() => handleFav()}>
									<Button.icon>
										{favState ? (
											<Check weight="bold" />
										) : (
											<Plus weight="bold" />
										)}
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

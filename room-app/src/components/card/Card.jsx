import styles from './Card.module.scss'
import { Tag } from '../tags/Tags'
import { ReactComponent as Separator } from '../../assets/separator.svg'
import { ReactComponent as R } from '../../assets/r.svg'
import { Play, Heart, Check } from 'phosphor-react'
import { Image } from '../helper/image/Image'
import { useState } from 'react'
import { useEffect } from 'react'
import { ADD_FAV, REMOVE_FAV } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch'
import { updateFav } from '../../store/user'

export function Card({ item }) {
	const { user } = useSelector((state) => state)
	const dispatch = useDispatch()
	const { request } = useFetch()

	const favorites = user.data?.favorites ? user.data?.favorites : []
	const [favState, setFavState] = useState()

	async function addFav(favorite) {
		setFavState(true)
		const { url, options } = ADD_FAV(
			{ id: user.data?.id, email: user.data?.email },
			favorite
		)
		const { error } = await request(url, options)
		dispatch(updateFav([...user.data?.favorites, favorite]))
		if (error) dispatch(userLogout())
	}

	async function removeFav(favorite) {
		setFavState(false)
		const { url, options } = REMOVE_FAV(
			{ id: user.data?.id, email: user.data?.email },
			favorite
		)
		const { error } = await request(url, options)
		dispatch(updateFav([...user.data?.favorites.filter((item) => item != favorite)]))
		if (error) dispatch(userLogout())
	}

	function handleFav() {
		if (!favState) {
			setFavState(true)
			addFav(item.id)
		} else {
			setFavState(false)
			removeFav(item.id)
		}
	}

	useEffect(() => {
		favorites.includes(item.id) && setFavState(favorites)
	}, [favorites])

	return (
		<div className={styles.cardImg}>
			<Image src={item.src} />
			<div className={styles.rTag}>
				<R />
			</div>
			<div className={styles.extras}>
				<div className={styles.extraDescription}>
					<h2 className={styles.title}>{item.name}</h2>
					<div className={styles.options}>
						<Play weight="fill" alt="Assistir" />
						{favState ? (
							<Check
								weight="fill"
								alt="Remover dos favoritos"
								onClick={() => handleFav()}
							/>
						) : (
							<Heart
								weight="fill"
								alt="Adicionar aos favoritos"
								onClick={() => handleFav()}
							/>
						)}
					</div>
					<p className={styles.synopsis}>{item.synopsis}</p>
					<span className={styles.extraExtra}>
						{item.year} <Separator className={styles.separator} /> {item.size}{' '}
						<Separator className={styles.separator} />
						<Tag.root>
							<Tag.pg pg={item.pg} size="sm" />
						</Tag.root>
					</span>
				</div>
			</div>
		</div>
	)
}

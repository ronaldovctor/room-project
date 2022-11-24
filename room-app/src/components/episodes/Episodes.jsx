import { CardEpisode } from '../card-episode/CardEpisode'
import styles from './Episodes.module.scss'

export function Episodes() {
	return (
		<div className={styles.episodes}>
			<CardEpisode />
			<CardEpisode />
			<CardEpisode />
			<CardEpisode />
			<CardEpisode />
			<CardEpisode />
			<CardEpisode />
			<CardEpisode />
		</div>
	)
}

import styles from './MovieDetails.module.scss'
import { ReactComponent as Separator } from '../../assets/separator.svg'
import { Tag } from '../tags/Tags'

export function MovieDetails() {
	return (
		<div className={styles.details}>
			<div className={styles.imdb}>
				<Tag.root>
					<Tag.imdb score={8.1} />
				</Tag.root>
				<Separator />
				<p className={styles.imdbVotes}>10.525</p>
			</div>
			<div className={styles.extras}>
				<Tag.root>
					<Tag.pg pg={18} />
				</Tag.root>
				<Separator />
				<p>2h 45m</p>
				<Separator />
				<p>Ação, Suspense</p>
				<Separator />
				<p>2019</p>
			</div>
		</div>
	)
}

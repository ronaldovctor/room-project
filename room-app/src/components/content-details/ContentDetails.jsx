import styles from './ContentDetails.module.scss'
import { ReactComponent as Separator } from '../../assets/separator.svg'
import { Tag } from '../tags/Tags'

export function ContentDetails({ data }) {
	const { imdb, pg, year, size, category } = data

	return (
		<div className={styles.details}>
			<div className={styles.imdb}>
				<Tag.root>
					<Tag.imdb score={imdb.rate} />
				</Tag.root>
				<Separator />
				<p className={styles.imdbVotes}>{imdb.votes}</p>
			</div>
			<div className={styles.extras}>
				<Tag.root>
					<Tag.pg pg={pg} />
				</Tag.root>
				<Separator />
				<p>{size}</p>
				<Separator />
				<p>{category.join(', ')}</p>
				<Separator />
				<p>{year}</p>
			</div>
		</div>
	)
}

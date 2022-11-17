import styles from './SlideCard.module.scss'
import { Tag } from '../../../tags/Tags'
import { ReactComponent as Separator } from '../../../../assets/separator.svg'
import { ReactComponent as R } from '../../../../assets/r.svg'

export function SlideCard({ item }) {
	return (
		<div className={styles.slideImg}>
			<img src={item.src} />
			<div className={styles.rTag}>
				<R />
			</div>
			<div className={styles.extras}>
				<div className={styles.extraDescription}>
					<h2 className={styles.title}>{item.name}</h2>
					<p className={styles.synopsis}>{item.synopsis}</p>
					<span className={styles.extraExtra}>
						{item.year} <Separator className={styles.separator} /> {item.size}{' '}
						<Separator className={styles.separator} />
						<Tag.root>
							<Tag.pg pg={item.pg} size={'sm'} />
						</Tag.root>
					</span>
				</div>
			</div>
		</div>
	)
}

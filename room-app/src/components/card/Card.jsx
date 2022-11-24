import styles from './Card.module.scss'
import { Tag } from '../tags/Tags'
import { ReactComponent as Separator } from '../../assets/separator.svg'
import { ReactComponent as R } from '../../assets/r.svg'
import { Play, Heart } from 'phosphor-react'
import { Image } from '../helper/image/Image'

export function Card({ item }) {
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
						<Play weight="fill" />
						<Heart weight="fill" />
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

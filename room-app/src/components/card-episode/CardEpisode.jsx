import styles from './CardEpisode.module.scss'
import { Image } from './../helper/image/Image'

export function CardEpisode() {
	return (
		<div className={styles.cardEpisode}>
			<Image src={'https://images5.alphacoders.com/927/927025.png'} />
			<div className={styles.cardEpisodeDesc}>
				<div className={styles.desc}>
					<div className={styles.title}>
						<h2>1. Diamante raro</h2>
						<p>56m</p>
					</div>
					<p className={styles.synopsis}>
						Daphne estreia no mercado de casamentos de Londres. As fofocas sobre a
						alta sociedade rolam soltas nas redes sociais. Simon, um duque
						solteirão, volta à cidade.
					</p>
				</div>
			</div>
		</div>
	)
}

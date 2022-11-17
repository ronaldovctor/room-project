import { Button } from '../forms/button/Button'
import styles from './MainContent.module.scss'

import { FilmStrip, Play } from 'phosphor-react'
import { MovieDetails } from '../movie-details/MovieDetails'

export function MainContent() {
	return (
		<section className={styles.mainContent}>
			<div className={styles.movie}>
				<div className={styles.title}>
					<h1 className={styles.name}>
						<span>J</span>ohn <span>W</span>ick <span>3</span>
					</h1>
					<MovieDetails />
					<div className={styles.extras}></div>
				</div>
				<div className={styles.description}>
					<p>
						Após assassinar o chefe da máfia Santino D'Antonio (Riccardo Scamarcio)
						no Hotel Continental, John Wick (Keanu Reeves) passa a ser perseguido
						pelos membros da Alta Cúpula sob a recompensa de U$14 milhões. Agora,
						ele precisa unir forças com antigos parceiros que o ajudaram no passado
						enquanto luta por sua sobrevivência.
					</p>
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
				</div>
			</div>
			<div
				className={styles.bg}
				style={{
					transform: 'rotateY(180deg)',
				}}
			>
				<img
					src="https://images3.alphacoders.com/103/thumb-1920-1033561.jpg"
					alt="Conteúdo destaque"
				/>
			</div>
		</section>
	)
}

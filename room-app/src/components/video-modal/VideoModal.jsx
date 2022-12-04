import styles from './VideoModal.module.scss'

export function VideoModal() {
	return (
		<div className={styles.videoModal}>
			<iframe
				src="https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&color=white&iv_load_policy=3&rel=0"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen"
			></iframe>
		</div>
	)
}

import styles from './VideoModal.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { closeVideoModal } from '../../store/ui'
import { useEffect, useRef } from 'react'

export function VideoModal() {
	const { ui } = useSelector((state) => state)
	const dispatch = useDispatch()
	const video = useRef(null)

	function handleOutsideClick({ target, currentTarget }) {
		if (target === currentTarget) dispatch(closeVideoModal())
	}

	useEffect(() => {
		if (video.current) {
			window.scroll({
				top: video.current.offsetTop - 100,
				behavior: 'smooth',
			})
		}
	}, [ui, video])

	if (!ui.videoModal) return null
	return (
		<div className={styles.videoModal} onClick={handleOutsideClick}>
			<iframe
				src="https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&color=white&iv_load_policy=3&rel=0"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen"
				ref={video}
			></iframe>
		</div>
	)
}

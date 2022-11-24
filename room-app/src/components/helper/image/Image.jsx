import styles from './Image.module.scss'
import { useState } from 'react'

export function Image({ alt = 'Card img', src }) {
	const [skeleton, setSkeleton] = useState(true)

	function handleLoad() {
		setSkeleton(false)
	}

	return (
		<div className={styles.wrapper}>
			{skeleton && <div className={styles.skeleton}></div>}
			<img src={src} alt={alt} onLoad={handleLoad} />
		</div>
	)
}

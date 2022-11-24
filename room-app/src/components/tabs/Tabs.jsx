import styles from './Tabs.module.scss'
import { forwardRef, useState } from 'react'

export const Tabs = forwardRef(({ titles, contents }, ref) => {
	const [actualTab, setActualTab] = useState(0)

	return (
		<section className={styles.tabs} ref={ref}>
			<div className={styles.options}>
				{titles &&
					titles.map((title, index) => (
						<button
							key={title}
							className={`${styles.option} ${
								index === actualTab ? styles.active : ''
							}`}
							onClick={() => setActualTab(index)}
						>
							{title}
						</button>
					))}
			</div>
			{contents &&
				contents.map((content, index) => (
					<div className={styles.content} key={44 + index}>
						{index == actualTab ? content : null}
					</div>
				))}
		</section>
	)
})

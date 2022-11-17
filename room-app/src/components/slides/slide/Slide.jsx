import styles from './Slide.module.scss'
import { useEffect, useRef } from 'react'
import { SlideCard } from './slide-card/SlideCard'

export function Slide({ parentRef, content }) {
	const wrapper = useRef(null)
	const slide = useRef(null)
	let slideImgs

	const slidePos = {
		initial: 0,
		final: 0,
		movement: 0,
		movePosition: 0,
		index: 0,
	}

	let imgsPos

	function onStart(event) {
		transition(false)
		slidePos.initial = event.clientX
		wrapper.current.addEventListener('mousemove', onMove)
	}

	function onMove(event) {
		const movement = updatePosition(event.clientX)
		slideMove(movement)
	}

	function onEnd() {
		transition(true)
		wrapper.current.removeEventListener('mousemove', onMove)

		if (slidePos.movement > 300) changeIndexPos(slidePos.index + 4)
		else if (slidePos.movement < -300) changeIndexPos(slidePos.index - 4)
		else changeIndexPos(slidePos.index)

		slidePos.final = slidePos.movePosition
	}

	function slideMove(distX) {
		slidePos.movePosition = distX
		slide.current.style.transform = `translate3d(${-distX}px, 0, 0)`
	}

	function transition(active) {
		slide.current.style.transition = active ? 'transform .3s' : ''
	}

	function updatePosition(clientX) {
		slidePos.movement = (slidePos.initial - clientX) * 1.4
		return slidePos.movement + slidePos.final
	}

	function setSlideEvents() {
		slide.current.addEventListener('mousedown', onStart)
		slide.current.addEventListener('mouseup', onEnd)
	}

	function getImgsPos() {
		imgsPos = [...slideImgs].map((img) => {
			const pos = img.offsetLeft
			return {
				img,
				pos,
			}
		})
	}

	function changeIndexPos(index) {
		getImgsPos()
		let newIndex = 0
		if (index > slideImgs.length - 1) newIndex = slideImgs.length - 1
		else if (index < 0) newIndex = 0
		else newIndex = index
		const pos = imgsPos[newIndex].pos
		slidePos.final = pos
		slidePos.index = newIndex
		slideMove(pos)
	}

	useEffect(() => {
		if (slide.current) {
			slideImgs = [...slide.current.children[0].children]
			setSlideEvents()
			changeIndexPos(0)
		}

		if (cards.current) checkSlideImgs()
	}, [])

	const cards = useRef(null)
	function checkSlideImgs() {
		const imgsChildrens = [...cards.current.children]
		imgsChildrens.forEach((img) => {
			img.addEventListener('mouseover', ({ currentTarget }) => {
				const liChildren = currentTarget.childNodes
				const slideImg = liChildren[0]

				const extraContentBottom = slideImg.children[2].getBoundingClientRect().bottom
				const parentBottom = parentRef.current.getBoundingClientRect().bottom

				extraContentBottom > parentBottom && (slideImg.style = 'top: -7rem')

				slideImg.addEventListener('mouseleave', ({ currentTarget }) => {
					currentTarget.style = ''
				})
			})
		})
	}

	return (
		<div className={styles.wrapper} ref={wrapper}>
			<div className={styles.slide} ref={slide}>
				<ul className={styles.cards} ref={cards}>
					{content.map((item, i) => (
						<li key={i + 34} className={styles.card}>
							<SlideCard item={item} />
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

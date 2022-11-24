import styles from './Slide.module.scss'
import { useEffect, useRef, useState } from 'react'
import { Card } from '../../card/Card'
import { ReactComponent as Right } from '../../../assets/arrow-right.svg'
import { ReactComponent as Left } from '../../../assets/arrow-left.svg'

export function Slide({ parentRef, data }) {
	const wrapper = useRef(null)
	const slide = useRef(null)
	const nextBtn = useRef(null)
	const prevBtn = useRef(null)

	const slidePos = {
		initial: 0,
		final: 0,
		movement: 0,
		movePosition: 0,
		index: 0,
	}
	// const [slidePos, setSlidePos] = useState({
	// 	initial: 0,
	// 	final: 0,
	// 	movement: 0,
	// 	movePosition: 0,
	// 	index: 0,
	// })

	let slideImgs
	let imgsPos

	function onStart(event) {
		transition(false)
		if (event.type === 'mousedown') slidePos.initial = event.clientX
		else slidePos.initial = event.changedTouches[0].clientX
		wrapper.current.addEventListener('mousemove', onMove)
		wrapper.current.addEventListener('touchmove', onMove)
	}

	function onMove(event) {
		const pointerPosition =
			event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX
		const movement = updatePosition(pointerPosition)
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
		slide.current.addEventListener('touchstart', onStart)
		slide.current.addEventListener('mouseup', onEnd)
		slide.current.addEventListener('touchend', onEnd)
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

	function handleDirection(direction) {
		slideImgs = [...slide.current.children[0].children]
		if (direction == 'left') {
			transition(true)
			return changeIndexPos(slidePos.index - 1)
		} else if (direction == 'right') {
			transition(true)
			return changeIndexPos(slidePos.index + 1)
		}
	}

	useEffect(() => {
		if (slide.current) {
			slideImgs = [...slide.current.children[0].children]
			checkSlideImgs()
			setSlideEvents()
			changeIndexPos(0)
		}
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
					{data.map((item, i) => (
						<li key={i + 34} className={styles.card}>
							<Card item={item} />
						</li>
					))}
				</ul>
			</div>
			<button
				className={styles.prevBtn}
				ref={prevBtn}
				onClick={() => handleDirection('left')}
			>
				<Left />
			</button>
			<button
				className={styles.nextBtn}
				ref={nextBtn}
				onClick={() => handleDirection('right')}
			>
				<Right />
			</button>
		</div>
	)
}

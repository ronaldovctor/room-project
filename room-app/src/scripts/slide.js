// Slide
export function initSlide(wrapper, slide, slideImgs) {
	// const wrapper = document.querySelector('[data-slide="wrapper"]')
	// const slide = document.querySelector('[data-slide="slide"]')
	// const slideImgs = document.querySelectorAll('[data-slide="img"]')

	const slidePos = {
		initial: 0,
		final: 0,
		movement: 0,
	}

	let imgsPos

	function onStart(event) {
		slidePos.initial = event.clientX
		wrapper.addEventListener('mousemove', onMove)
	}

	function onMove(event) {
		const movement = updatePosition(event.clientX)
		slideMove(movement)
	}

	function onEnd() {
		wrapper.removeEventListener('mousemove', onMove)
		slidePos.final = slidePos.movement
	}

	function slideMove(distX) {
		slidePos.movement = distX
		slide.style.transform = `translate3d(${-distX}px, 0, 0)`
	}

	function updatePosition(clientX) {
		const movement = (slidePos.initial - clientX) * 1.4
		return movement + slidePos.final
	}

	function setSlideEvents() {
		console.log(slide)
		slide.addEventListener('mousedown', onStart)
		slide.addEventListener('mouseup', onEnd)
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
		const pos = imgsPos[index].pos
		slidePos.final = pos
		slideMove(pos)
	}

	return {
		setSlideEvents,
		changeIndexPos,
	}
}

// const slide = initSlide()
// slide.setSlideEvents()
// slide.changeIndexPos(0)

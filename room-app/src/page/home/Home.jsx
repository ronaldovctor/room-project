import { useEffect } from 'react'
import { MainContent } from '../../components/main-content/MainContent'
import { Slides } from '../../components/slides/Slides'
import { Header } from '../header/Header'

export function Home({ updateBg }) {
	const slidesCategories = [
		'Ação',
		'Ficção',
		'Suspense',
		'Terror',
		'Romance',
		'Fantasia',
	]

	useEffect(() => {
		updateBg('home')
	}, [])

	return (
		<div>
			<Header />
			<MainContent />
			<Slides categories={slidesCategories} />
		</div>
	)
}

import { useState } from 'react'
import { useEffect } from 'react'
import { MainContent } from '../../components/main-content/MainContent'
import { Slides } from '../../components/slides/Slides'
import useFetch from '../../hooks/useFetch'
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

	const [main, setMain] = useState()
	const { loading, data, request } = useFetch()
	async function fetchContent() {
		const { json } = await request('./data.json')
		setMain(json[3])
	}

	useEffect(() => {
		updateBg('home')
		fetchContent()
	}, [])

	if (loading) return null
	return (
		<>
			<Header />
			<MainContent data={main} />
			<Slides categories={slidesCategories} data={data} />
		</>
	)
}

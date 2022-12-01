import { useState } from 'react'
import { useEffect } from 'react'
import { MainContent } from '../../components/main-content/MainContent'
import { Slides } from '../../components/slides/Slides'
import { Loading } from '../../components/helper/loading/Loading'
import useFetch from '../../hooks/useFetch'
import { Header } from '../header/Header'

export function Home({ updateBg }) {
	const slidesCategories = [
		{
			label: 'Ação',
			link: '/category/?search=action',
		},
		{
			label: 'Aventura',
			link: '/category/?search=adventure',
		},
		{
			label: 'Comédia',
			link: '/category/?search=comedy',
		},
		{
			label: 'Drama',
			link: '/category/?search=drama',
		},
		{
			label: 'Documentário',
			link: '/category/?search=documentary',
		},
		{
			label: 'Fantasia',
			link: '/category/?search=fantasy',
		},
		{
			label: 'Terror',
			link: '/category/?search=terror',
		},
		{
			label: 'Suspense',
			link: '/category/?search=suspense',
		},
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

	if (loading) return <Loading />
	return (
		<>
			<Header />
			<MainContent data={main} />
			<Slides categories={slidesCategories} data={data} />
		</>
	)
}

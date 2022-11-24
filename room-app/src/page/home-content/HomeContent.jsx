import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { MainContent } from '../../components/main-content/MainContent'
import { Header } from '../header/Header'
import { Slide } from '../../components/slides/slide/Slide'
import { Tabs } from '../../components/tabs/Tabs'
import { CardEpisode } from '../../components/card-episode/CardEpisode'
import { Episodes } from '../../components/episodes/Episodes'

export function HomeContent({ updateBg }) {
	const tab = useRef(null)

	const [main, setMain] = useState()
	const [newData, setNewData] = useState()
	const { loading, data, request } = useFetch()
	async function fetchContent() {
		const { json } = await request('./data.json')
		setNewData(json)
		setMain(json[0])
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
			<Tabs
				ref={tab}
				titles={['Relacionados', 'Detalhes']}
				contents={[<Slide parentRef={tab} data={newData} />, <Episodes />]}
			/>
		</>
	)
}

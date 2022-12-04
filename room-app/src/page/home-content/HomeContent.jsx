import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { MainContent } from '../../components/main-content/MainContent'
import { Header } from '../header/Header'
import { Slide } from '../../components/slides/slide/Slide'
import { Tabs } from '../../components/tabs/Tabs'
import { Episodes } from '../../components/episodes/Episodes'
import { Loading } from '../../components/helper/loading/Loading'
import { VideoModal } from '../../components/video-modal/VideoModal'
import data from '../../../public/data.json'
import { useSearchParams } from 'react-router-dom'

export function HomeContent({ updateBg }) {
	const tab = useRef(null)

	const [main, setMain] = useState()
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		const item = searchParams.get('search')
		updateBg('home')
		setMain(data[item])
	}, [searchParams])

	if (!main) return <Loading />
	return (
		<>
			<Header />
			<MainContent data={main} />
			<Tabs
				ref={tab}
				titles={['Relacionados', 'Detalhes']}
				contents={[<Slide parentRef={tab} data={data} />, <Episodes />]}
			/>
			{/* <VideoModal /> */}
		</>
	)
}

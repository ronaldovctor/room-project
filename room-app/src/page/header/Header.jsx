import { NavLink, useNavigate } from 'react-router-dom'
import { Heart, CaretDown } from 'phosphor-react'
import styles from './Header.module.scss'

import { ReactComponent as Separator } from '../../assets/separator.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Dropdown } from '../../components/dropdown/Dropdown'
import { useState } from 'react'
import { Search } from '../../components/search/Search'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Header() {
	const { data } = useSelector((state) => state.user)

	const categoryOptions = [
		{
			label: 'Ação e aventura',
			link: '/category/?search=actionAdventure',
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
		{
			label: 'Lançamentos',
			link: '/category/?search=all',
		},
		{
			label: 'Novas adições',
			link: '/category/?search=all',
		},
	]
	const accountOptions = [
		{
			label: 'Minha conta',
			link: '/profile',
		},
		{
			label: 'Sair',
			link: '/sair',
		},
	]

	const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
	const [isAccountOpen, setIsAccountOpen] = useState(false)
	const [isExploreOpen, setIsExploreOpen] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		isExploreOpen == false && setIsCategoriesOpen(false)
	}, [isExploreOpen])

	return (
		<header className={styles.header}>
			<nav className={`container ${styles.nav}`}>
				<div className={styles.navFav}>
					<NavLink to="/category/?search=favorites">
						<Heart size={24} weight="fill" color="#fb2576" />
						<span>Favoritos</span>
					</NavLink>
				</div>
				<div className={styles.navMain}>
					<div
						className={`${styles.explore} `}
						onClick={() => setIsExploreOpen(!isExploreOpen)}
					>
						<p>Explorar</p>
						<CaretDown
							weight="bold"
							size={22}
							color={'#fff'}
							className={`${isExploreOpen ? styles.active : ''}`}
						/>
					</div>
					<ul className={`${styles.options} ${isExploreOpen ? styles.active : ''}`}>
						<li>
							<NavLink to="/category/?search=series" className={styles.optionName}>
								Séries
							</NavLink>
						</li>
						<li>
							<Separator className={styles.sep} />
						</li>
						<li>
							<NavLink to="/category/?search=movies" className={styles.optionName}>
								Filmes
							</NavLink>
						</li>
						<li>
							<Separator className={styles.sep} />
						</li>
						<li
							style={{ position: 'relative' }}
							className={`${isCategoriesOpen ? styles.active : ''}`}
						>
							<div
								className={styles.category}
								onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
							>
								<p
									className={`${styles.optionName} ${
										isCategoriesOpen ? styles.active : ''
									}`}
								>
									Categorias
								</p>
								<CaretDown weight="bold" size={22} color={'#fff'} />
							</div>
							<Dropdown
								options={categoryOptions}
								isOpen={isCategoriesOpen}
								setLine={true}
							/>
						</li>
					</ul>
					<div className={styles.logo} onClick={() => navigate('/')}>
						<Logo />
					</div>
					<div>
						<Search />
					</div>
				</div>
				<div className={styles.navAccount}>
					<i className={styles.navUserIcon}>
						<CaretDown
							weight="bold"
							size={22}
							color={'#fff'}
							className={styles.mediaArrow}
						/>
					</i>

					<div
						className={styles.navUser}
						onClick={() => setIsAccountOpen(!isAccountOpen)}
					>
						<div
							className={`${styles.user} ${isAccountOpen ? styles.active : ''} `}
						>
							<p
								className={`${styles.userName} ${
									isAccountOpen ? styles.active : ''
								}`}
							>
								{data.name}
							</p>
							<CaretDown weight="bold" size={22} color={'#fff'} />
							<Dropdown
								options={accountOptions}
								isOpen={isAccountOpen}
								setLine={false}
								className={styles.moveDropDown}
							/>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

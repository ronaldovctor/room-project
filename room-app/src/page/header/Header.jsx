import { NavLink } from 'react-router-dom'
import { Heart, CaretDown } from 'phosphor-react'
import styles from './Header.module.scss'

import { ReactComponent as Separator } from '../../assets/separator.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Dropdown } from '../../components/dropdown/Dropdown'
import { useState } from 'react'

export function Header() {
	const categoryOptions = [
		'Ação e aventura',
		'Comédia',
		'Drama',
		'Documentário',
		'Fantasia',
		'Terror',
		'Suspense',
		'Lançamentos',
		'Novas adições',
	]
	const accountOptions = ['Minha conta', 'Sair']

	const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
	const [isAccountOpen, setIsAccountOpen] = useState(false)

	return (
		<header className={styles.header}>
			<nav className={`container ${styles.nav}`}>
				<div className={styles.navFav}>
					<NavLink to="/favoritos">
						<Heart size={24} weight="fill" color="#fb2576" />
						<span>Favoritos</span>
					</NavLink>
				</div>
				<div className={styles.navMain}>
					<ul className={styles.options}>
						<li>
							<NavLink to="/series" className={styles.optionName}>
								Séries
							</NavLink>
						</li>
						<li>
							<Separator />
						</li>
						<li>
							<NavLink to="/filmes" className={styles.optionName}>
								Filmes
							</NavLink>
						</li>
						<li>
							<Separator />
						</li>
						<li
							style={{ position: 'relative' }}
							className={isCategoriesOpen ? styles.active : ''}
						>
							<div
								className={styles.category}
								onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
							>
								<p className={styles.optionName}>Categorias</p>
								<CaretDown weight="bold" size={22} color={'#fff'} />
							</div>
							<Dropdown
								options={categoryOptions}
								isOpen={isCategoriesOpen}
								setLine={true}
							/>
						</li>
					</ul>
					<div className={styles.logo}>
						<Logo />
					</div>
					<div>
						<input type="text" name="" id="" />
					</div>
				</div>
				<div className={styles.navAccount}>
					<i className={styles.navUserIcon}></i>
					<div
						className={styles.navUser}
						onClick={() => setIsAccountOpen(!isAccountOpen)}
					>
						<div className={`${styles.user} ${isAccountOpen ? styles.active : ''}`}>
							<p className={styles.userName}>Ronaldo V.</p>
							<CaretDown weight="bold" size={22} color={'#fff'} />
							<Dropdown
								options={accountOptions}
								isOpen={isAccountOpen}
								setLine={false}
							/>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

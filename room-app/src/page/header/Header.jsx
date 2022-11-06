import { NavLink } from 'react-router-dom'

export function Header() {
	return (
		<header>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/login">Login</NavLink>
			</nav>
		</header>
	)
}

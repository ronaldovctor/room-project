import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './page/home/Home'
import { Login } from './components/login/Login'
import { Footer } from './page/footer/Footer'
import { useDispatch } from 'react-redux'
import { ProtectedRoute } from './components/helper/ProtectedRoute'
import { HomeContent } from './page/home-content/HomeContent'
import { Profile } from './components/profile/Profile'
import { ContentType } from './components/content-type/ContentType'
import { useEffect } from 'react'
import { autoLogin } from './store/user'
import { Logout } from './components/logout/Logout'
import { NotFound } from './page/not-found/NotFound'

function App() {
	function updateBg(className) {
		const app = document.querySelector('.App')
		const name = className ? `App ${className}` : 'App'
		app.setAttribute('class', name)
	}
	const dispatch = useDispatch()

	useEffect(() => {
		const token = window.localStorage.getItem('token')
		const email = window.localStorage.getItem('email')
		if (token && email) dispatch(autoLogin())
	}, [dispatch])

	return (
		<div className="App">
			<BrowserRouter>
				<div className="AppContent">
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Home updateBg={updateBg} />
								</ProtectedRoute>
							}
						/>
						<Route path="login/*" element={<Login updateBg={updateBg} />} />
						<Route
							path="profile"
							element={
								<ProtectedRoute>
									<Profile updateBg={updateBg} />
								</ProtectedRoute>
							}
						/>
						<Route
							path="content"
							element={
								<ProtectedRoute>
									<HomeContent updateBg={updateBg} />
								</ProtectedRoute>
							}
						/>
						<Route
							path="category"
							element={
								<ProtectedRoute>
									<ContentType updateBg={updateBg} />
								</ProtectedRoute>
							}
						/>
						<Route path="sair" element={<Logout />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</BrowserRouter>
			<Footer />
		</div>
	)
}

export default App

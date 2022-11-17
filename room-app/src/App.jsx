import './App.scss'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './page/home/Home'
import { Login } from './components/login/Login'
import { Footer } from './page/footer/Footer'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import { ProtectedRoute } from './components/helper/ProtectedRoute'

function App() {
	function updateBg(className) {
		const app = document.querySelector('.App')
		const name = className ? `App ${className}` : 'App'
		app.setAttribute('class', name)
	}

	return (
		<div className="App">
			<BrowserRouter>
				<div className="AppContent">
					<Provider store={store}>
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
						</Routes>
					</Provider>
				</div>
			</BrowserRouter>
			<Footer />
		</div>
	)
}

export default App

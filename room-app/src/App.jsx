import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './page/home/Home'
import { Login } from './components/login/Login'
import { Footer } from './page/footer/Footer'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import { ProtectedRoute } from './components/helper/ProtectedRoute'

function App() {
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
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route path="login/*" element={<Login />} />
						</Routes>
					</Provider>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App

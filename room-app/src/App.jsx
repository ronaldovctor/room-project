import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './page/home/Home'
import { Login } from './components/login/Login'
import { Footer } from './page/footer/Footer'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<div className="AppContent">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="login/*" element={<Login />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App

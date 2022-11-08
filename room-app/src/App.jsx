import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './page/home/Home'
import { Login } from './components/login/Login'
import { Header } from './page/header/Header'
import { Footer } from './page/footer/Footer'

function App() {
	return (
		<div
			className="App"
			style={{
				background:
					'url("https://images3.alphacoders.com/103/thumb-1920-1033561.jpg")',
			}}
		>
			<BrowserRouter>
				<div className="AppContent">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="login" element={<Login />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App

import Navigation from './components/Navigation'
import './App.css'
import Picks from './pages/Picks'
import Schedule from './pages/Schedule'
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'

const App = () => (
	<Container>
		<Navigation />

		<Routes>
			<Route path='/trades-ui' element={<Picks />} />
			<Route path='/schedule' element={<Schedule />} />
		</Routes>
	</Container>
)

export default App

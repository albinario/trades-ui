import Navigation from './components/Navigation'
import './App.css'
import { useGetPlayers } from './hooks/usePlayers'
import Picks from './pages/Picks'
import Schedule from './pages/Schedule'
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'

const App = () => {
	const { data: players } = useGetPlayers()

	return (
		<Container fluid>
			<Navigation />

			<Routes>
				<Route path='/trades-ui' element={<Picks players={players} />} />
				<Route path='/schedule' element={<Schedule players={players?.filter(player => player.picker)} />} />
			</Routes>
		</Container>
	)
}

export default App

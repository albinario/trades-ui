import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Container from 'react-bootstrap/Container'
import Picks from './pages/Picks'

const App = () => {
	return(
		<>
			<Navigation />

			<Container>
				<Routes>
					<Route path='/trades-ui' element={<Picks />} />
				</Routes>
			</Container>
		</>
	)
}

export default App

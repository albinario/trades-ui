import Fetching from './Fetching'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () => (
	<Navbar bg='dark' variant='dark'>
		<Navbar.Brand as={Link} to='/'>Trades</Navbar.Brand>
		<Fetching />

		<Nav className='ms-auto'>
			<Nav.Link as={NavLink} to='/trades-ui'>Picks</Nav.Link>
			<Nav.Link as={NavLink} to='/schedule'>Schedule</Nav.Link>
		</Nav>
	</Navbar>
)

export default Navigation

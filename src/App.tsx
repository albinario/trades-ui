import Navigation from './components/Navigation'
import './App.css'
import { useGetPlayers } from './hooks/usePlayers'
import { useGetTeamRecords } from './hooks/useGetTeamRecords'
import Home from './pages/Home'
import Picks from './pages/Picks'
import Schedule from './pages/Schedule'
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'

const App = () => {
	const { data: players } = useGetPlayers()
	const { data: teamRecords } = useGetTeamRecords()

	const teams = teamRecords?.map((teamRecord) => ({
		abbrev: teamRecord.teamAbbrev.default,
		name: teamRecord.teamName.default,
		value: Number(teamRecord.leagueL10Sequence),
	}))

	return (
		<Container fluid>
			<Navigation />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/trades-ui'
					element={<Picks playersAll={players} teams={teams} />}
				/>
				<Route
					path='/schedule'
					element={
						<Schedule
							playersPicked={players?.filter((player) => player.picker)}
							teamRecords={teamRecords}
							teams={teams}
						/>
					}
				/>
			</Routes>
		</Container>
	)
}

export default App

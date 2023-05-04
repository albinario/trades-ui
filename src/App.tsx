import { useEffect, useState } from 'react'
import './App.css'
import { Player, Team } from './types'
import { nhlApi, tradesApi } from './util/config'
import PlayerAddForm from './components/PlayerAddForm'
import PlayerEditForm from './components/PlayerEditForm'
import Picker from './components/Picker'

const App = () => {
	const [playersAdded, setPlayersAdded] = useState<Player[]>([])
	useEffect(() => {
		fetch(`${tradesApi}/players`)
			.then(res => res.json())
			.then(players => {
				setPlayersAdded(players.data)
				return
			})
			.catch(err => console.error(err))
	}, [])

	const [teams, setTeams] = useState<Team[]>([])
	useEffect(() => {
		fetch(`${nhlApi}/teams`)
			.then(res => res.json())
			.then(teams => setTeams(teams.teams))
			.catch(err => console.error(err))
	}, [])

	return(
		<div className='row'>
			<h2>Add</h2>
			<PlayerAddForm
				playersAdded={playersAdded}
				teams={teams.sort((a,b) => a.name.localeCompare(b.name))}
			/>

			<h2 className='mt-4'>Edit</h2>
			<PlayerEditForm
				playersAdded={playersAdded}
			/>

			<Picker
				picker='Albin'
				players={playersAdded.filter(player => player.picker === 'A')}
			/>

			<Picker
				picker='Jakob'
				players={playersAdded.filter(player => player.picker === 'J')}
			/>

			<Picker
				picker='Sacke'
				players={playersAdded.filter(player => player.picker === 'S')}
			/>

			<Picker
				picker='Ville'
				players={playersAdded.filter(player => player.picker === 'V')}
			/>
		</div>
	)
}

export default App

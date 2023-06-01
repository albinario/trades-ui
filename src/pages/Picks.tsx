import { useEffect, useState } from 'react'
import { Player, Team } from '../types'
import { nhlApi } from '../util/config'
import PlayerAddForm from '../components/PlayerAddForm'
import PlayerEditForm from '../components/PlayerEditForm'
import Picker from '../components/Picker'
import * as PlayerAPI from '../services/playerAPI'
import Missing from '../components/Missing'

const Picks = () => {
	const [players, setPlayers] = useState<Player[]>([])
	const [teams, setTeams] = useState<Team[]>([])

	useEffect(() => {
		fetch(`${nhlApi}/teams`)
		.then(res => res.json())
		.then(teams => setTeams(teams.teams.sort((a: Team, b: Team) => a.name.localeCompare(b.name))))
		.catch(err => console.error(err))
	}, [])

	const _setPlayers = async () => {
		setPlayers(await PlayerAPI.getPlayers())
	}

	const addPlayer = async (playerToAdd: Player) => {
		if (players.find(player => player.id === playerToAdd.id)) {
			console.log("Player already exists")
			alert("Player already exists")
			return
		}
		await PlayerAPI.addPlayer(playerToAdd)
		_setPlayers()
	}

	const editPlayer = async (playerToEdit: Partial<Player>) => {		
		await PlayerAPI.editPlayer(playerToEdit)
		_setPlayers()
	}

	useEffect(() => {
		_setPlayers()
	}, [])

	const playersPicked = players.filter((player: Player) => player.picker !== '')

	return(
		<div className='row'>
			<h2>Add</h2>
			<PlayerAddForm
				teams={teams}
				onSubmit={addPlayer}
			/>

			<h2 className='mt-4'>Edit</h2>
			<PlayerEditForm
				playersAll={players}
				teams={teams}
				onSubmit={editPlayer}
			/>

			<Picker
				picker='Albin'
				players={playersPicked.filter(player => player.picker === 'A')}
				onRemovePicker={editPlayer}
			/>

			<Picker
				picker='Jakob'
				players={playersPicked.filter(player => player.picker === 'J')}
				onRemovePicker={editPlayer}
			/>

			<Picker
				picker='Sacke'
				players={playersPicked.filter(player => player.picker === 'S')}
				onRemovePicker={editPlayer}
			/>

			<Picker
				picker='Ville'
				players={playersPicked.filter(player => player.picker === 'V')}
				onRemovePicker={editPlayer}
			/>

			{playersPicked.length < 48 && (
				<Missing
					all={true}
					players={playersPicked}
				/>
			)}
		</div>
	)
}

export default Picks

import Missing from '../components/Missing'
import PlayerAddForm from '../components/PlayerAddForm'
import PlayerEditForm from '../components/PlayerEditForm'
import Picker from '../components/Picker'

import { useEffect, useState } from 'react'

import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import * as NhlAPI from '../services/nhlAPI'
import * as PlayerAPI from '../services/playerAPI'

import { Player, Team, TeamResult } from '../types'

const Picks = () => {
	const [error, setError] = useState<string|null>(null)
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [players, setPlayers] = useState<Player[]>([])
	const [teams, setTeams] = useState<Team[]>([])

	const getTeams = async () => {
		setError(null)
		setIsError(false)
		setIsLoading(true)

		try {
			const res = await NhlAPI.get<TeamResult>('teams')
			setTeams(res.teams.sort((a: Team, b: Team) => a.name.localeCompare(b.name)))

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message || `Something went wrong when fetching teams`)
			setIsError(true)
		}
		setIsLoading(false)
	}

	const _setPlayers = async () => {
		setPlayers(await PlayerAPI.getPlayers())
	}

	const addPlayer = async (playerToAdd: Player) => {
		if (players.find(player => player.id === playerToAdd.id)) {
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
		getTeams()
		_setPlayers()
	}, [])

	if (isError) {
		return <Alert variant='warning'>{error}</Alert>
	}

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

			{isLoading && (
				<div>
					<Spinner animation='border' className='mt-4' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			)}

			{!isLoading && (
				<>
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
				</>
			)}

			{!isLoading && playersPicked.length < 48 && (
				<Missing
					all={true}
					players={playersPicked}
				/>
			)}
		</div>
	)
}

export default Picks

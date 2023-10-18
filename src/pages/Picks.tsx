import Missing from '../components/Missing'
import Picker from '../components/Picker'
import PlayerAddForm from '../components/PlayerAddForm'
import PlayerEditForm from '../components/PlayerEditForm'
import { useCreatePlayer, useGetPlayers, useUpdatePlayer } from '../hooks/usePlayers'
import { useGetTeams } from '../hooks/useGetTeams'
import { Player } from '../types'

const Picks = () => {
	const { data: players } = useGetPlayers()
	const { data: teams } = useGetTeams()

	const createPlayer = useCreatePlayer()
	const updatePlayer = useUpdatePlayer()

	const addPlayer = async (playerToAdd: Player) => {
		if (players?.find(player => player.id === playerToAdd.id)) {
			alert("Player already exists")
			return
		}

		createPlayer.mutate(playerToAdd)
	}

	const editPlayer = (playerEdited: Partial<Player>) => updatePlayer.mutate(playerEdited)

	if (teams) return (
		<div className='row'>
			<h4>Add</h4>
			<PlayerAddForm
				teams={teams}
				onSubmit={addPlayer}
			/>

			<h4 className='mt-4'>Edit</h4>
			<PlayerEditForm
				playersAll={players}
				teams={teams}
				onSubmit={editPlayer}
			/>

			<Picker
				picker='Albin'
				players={players?.filter(player => player.picker === 'A')}
				onRemovePicker={editPlayer}
			/>
			<Picker
				picker='Jakob'
				players={players?.filter(player => player.picker === 'J')}
				onRemovePicker={editPlayer}
			/>
			<Picker
				picker='Sacke'
				players={players?.filter(player => player.picker === 'S')}
				onRemovePicker={editPlayer}
			/>
			<Picker
				picker='Ville'
				players={players?.filter(player => player.picker === 'V')}
				onRemovePicker={editPlayer}
			/>

			{players && players.length < 48 && (
				<Missing
					all={true}
					players={players}
				/>
			)}
		</div>
	)
}

export default Picks

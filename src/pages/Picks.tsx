import Missing from '../components/Missing'
import Picker from '../components/Picker'
import PlayerAddForm from '../components/PlayerAddForm'
import PlayerEditForm from '../components/PlayerEditForm'
import { useGetTeams } from '../hooks/useGetTeams'
import { useCreatePlayer, useUpdatePlayer } from '../hooks/usePlayers'
import type { Player } from '../types'

interface IProps {
	players?: Player[]
}

const Picks: React.FC<IProps> = (props) => {
	const { data: teams } = useGetTeams()

	const createPlayer = useCreatePlayer()
	const updatePlayer = useUpdatePlayer()

	const addPlayer = async (playerToAdd: Player) => {
		if (props.players?.find(player => player.id === playerToAdd.id)) {
			alert("Player already exists")
			return
		}

		createPlayer.mutate(playerToAdd)
	}

	const editPlayer = (playerEdited: Partial<Player>) => updatePlayer.mutate(playerEdited)

	return teams ? (
		<div className='row'>
			<h4>Add</h4>
			<PlayerAddForm
				teams={teams}
				onSubmit={addPlayer}
			/>

			<h4 className='mt-4'>Edit</h4>
			<PlayerEditForm
				playersAll={props.players}
				teams={teams}
				onSubmit={editPlayer}
			/>

			<Picker
				picker='Albin'
				players={props.players?.filter(player => player.picker === 'A')}
				onRemovePicker={editPlayer}
			/>
			<Picker
				picker='Jakob'
				players={props.players?.filter(player => player.picker === 'J')}
				onRemovePicker={editPlayer}
			/>
			<Picker
				picker='Sacke'
				players={props.players?.filter(player => player.picker === 'S')}
				onRemovePicker={editPlayer}
			/>
			<Picker
				picker='Ville'
				players={props.players?.filter(player => player.picker === 'V')}
				onRemovePicker={editPlayer}
			/>

			{props.players && props.players.length < 48 && (
				<Missing
					all={true}
					players={props.players}
				/>
			)}
		</div>
	) : <></>
}

export default Picks

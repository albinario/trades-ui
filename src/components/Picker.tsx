import 'bootstrap-icons/font/bootstrap-icons.css'
import { logos } from '../util/config'
import { Player } from '../types'

interface IProps {
	picker: string,
	players: Player[],
	onRemovePicker: (player: Partial<Player>) => void 
}

const Picker: React.FC<IProps> = (props) => {

	const removePicker = (id: number) => {
		const playerToEdit: Partial<Player> = {
			id
		}
		props.onRemovePicker(playerToEdit)
	}

	return (
		<div className='col mt-5'>
			<h3>{props.picker}</h3>

			{props.players
				.sort((a, b) => a.team - b.team)
				.map((player, index) => (
					<div key={index} className='mb-1'>
						<img
							src={`${logos}/${player.team}.svg`}
							alt={player.name}
						/>
						{player.name} <i className='bi bi-x-circle' onClick={() => removePicker(player.id)}></i>
					</div>
				))
			}
		</div>
	)
}

export default Picker

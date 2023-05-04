import { Player } from '../types'
import { logos } from '../util/config'

const Picker= (props: { picker: string, players: Player[] }) => {	
	return (
		<div className='col-3 mt-4'>
			<h3>{props.picker}</h3>

			{props.players.map((player, index) => (
				<div
					key={index}
					className='mb-1'
				>
					<img
						src={`${logos}/${player.team}.svg`}
						alt={player.name}
					/>
					{player.name}
				</div>
			))}
		</div>
	)
}

export default Picker

import 'bootstrap-icons/font/bootstrap-icons.css'
import { logos, tradesApi } from '../util/config'
import { Player } from '../types'

const Picker = (props: { picker: string, players: Player[] }) => {
	const removePicker = (id: number) => {
		fetch(`${tradesApi}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		})
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.error(error))
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

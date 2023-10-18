import 'bootstrap-icons/font/bootstrap-icons.css'
import { TPlayer } from '../types'
import Missing from './Missing'
import Logo from './Logo'

interface IProps {
	picker: string
	players?: TPlayer[]
	onRemovePicker: (player: Partial<TPlayer>) => void
}

const Picker: React.FC<IProps> = (props) => {
	const order = ['C', 'W', 'D', 'G']

	return (
		<div className='col mt-5'>
			<h3>{props.picker}</h3>

			{props.players && props.players
				.sort((a, b) => a.jersey - b.jersey)
				.sort((a, b) => order.indexOf(a.pos) - order.indexOf(b.pos))
				.map(player => (
					<div key={player.id} className='mb-1'>
						<Logo teamId={player.team} />
						{player.pos} {player.jersey} {player.name} {}
						<i
							className='bi bi-x-circle cursor-pointer'
							onClick={() => props.onRemovePicker({ id: player.id })}
							role='button'
						/>
					</div>
				))
			}
			{props.players && props.players.length < 12 && (
				<Missing
					all={false}
					players={props.players}
				/>
			)}
		</div>
	)
}

export default Picker

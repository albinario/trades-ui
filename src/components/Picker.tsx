import Missing from './Missing'
import type { Player } from '../types'
import { Image } from 'react-bootstrap'
import { getLogoUrl } from '../helpers/getLogoUrl'

interface IProps {
	picker: string
	players?: Player[]
	onRemovePicker: (player: Partial<Player>) => void
}

const Picker: React.FC<IProps> = (props) => {
	const order = ['C', 'W', 'D', 'G']

	return (
		<div className='col mt-5'>
			<h3>{props.picker}</h3>

			{props.players &&
				props.players
					.sort((a, b) => a.jersey - b.jersey)
					.sort((a, b) => order.indexOf(a.pos) - order.indexOf(b.pos))
					.map((player) => (
						<div key={player.id} className='mb-1'>
							<a
								className='cursor-pointer'
								onClick={() => props.onRemovePicker({ id: player.id })}
								role='button'
							>
								<Image src={getLogoUrl(player.team)} />
							</a>
							<span className='small'>
								{player.pos} {player.jersey}
							</span>{' '}
							{player.name}
						</div>
					))}
			{props.players && props.players.length < 12 && (
				<Missing all={false} players={props.players} />
			)}
		</div>
	)
}

export default Picker

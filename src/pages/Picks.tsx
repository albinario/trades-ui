import Missing from '../components/Missing'
import Picker from '../components/Picker'
import PlayerAddForm from '../components/PlayerAddForm'
import PlayerEditForm from '../components/PlayerEditForm'
import Row from 'react-bootstrap/Row'
import type { Player, Team } from '../types'

interface IProps {
	playersAll?: Player[]
	teams?: Team[]
}

const Picks: React.FC<IProps> = ({ playersAll, teams }) => (
	<>
		<h4>Add</h4>
		<PlayerAddForm playersAll={playersAll} />

		<h4 className='mt-4'>Edit</h4>
		<PlayerEditForm playersAll={playersAll} teams={teams} />

		<Row className='mt-5'>
			<Picker
				picker='Albin'
				playersPicked={playersAll?.filter((player) => player.picker === 'A')}
			/>
			<Picker
				picker='Jakob'
				playersPicked={playersAll?.filter((player) => player.picker === 'J')}
			/>
			<Picker
				picker='Sacke'
				playersPicked={playersAll?.filter((player) => player.picker === 'S')}
			/>
			<Picker
				picker='Ville'
				playersPicked={playersAll?.filter((player) => player.picker === 'V')}
			/>

			{playersAll && playersAll.length < 48 && (
				<Missing all={true} players={playersAll} />
			)}
		</Row>
	</>
)

export default Picks

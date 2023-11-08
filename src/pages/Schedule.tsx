import Team from '../components/Team'
import { useGetTeamRecords } from '../hooks/useGetTeamRecords'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import type { Player } from '../types'

interface IProps {
	players?: Player[]
}

const Schedule: React.FC<IProps> = (props) => {
	const { data: standings, isError } = useGetTeamRecords()

	if (isError) return <Alert variant='warning'>Error fetching teams</Alert>

	return (
		<Table size='sm' striped>
			<tbody>
				{standings?.map((team, index) => (
					<Team
						key={index}
						players={props.players?.filter(
							(player) => player.team === team.teamAbbrev.default
						)}
						teamRecord={team}
						teamValues={standings.map((team) => ({
							teamAbbrev: team.teamAbbrev.default,
							value: Number(team.leagueL10Sequence),
						}))}
					/>
				))}
			</tbody>
		</Table>
	)
}

export default Schedule

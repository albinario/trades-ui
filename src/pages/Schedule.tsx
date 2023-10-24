import Team from '../components/Team'
import { useGetStandings } from '../hooks/useGetStandings'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import type { Player } from '../types'

interface IProps {
	players?: Player[]
}

const Schedule: React.FC<IProps>  = (props) => {
	const { data: standings, isError } = useGetStandings()

	if (isError) return <Alert variant='warning'>Error fetching teams</Alert>

	return (
		<Table size='sm' striped>
			<tbody>
				{standings?.records[0].teamRecords.map(teamRecord => (
					<Team
						key={teamRecord.team.id}
						players={props.players?.filter(player => player.team === teamRecord.team.id)}
						teamRecord={teamRecord}
						teamValues={standings.records[0].teamRecords.map(team => ({
							teamId: team.team.id,
							value: Number(team.leagueL10Rank)
						}))}
					/>
				))}
			</tbody>
		</Table>
	)
}

export default Schedule

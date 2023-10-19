import Team from '../components/Team'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import { useGetStandings } from '../hooks/useGetStandings'

const Schedule = () => {
	const { data: standings, isError } = useGetStandings()

	if (isError) return <Alert variant='warning'>Error fetching teams</Alert>

	return (
		<Table size='sm' striped>
			<tbody>
				{standings?.records[0].teamRecords.map(team => (
					<Team
						key={team.team.id}
						team={team}
					/>
				))}
			</tbody>
		</Table>
	)
}

export default Schedule

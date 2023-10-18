import Team from '../components/Team'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { useGetStandings } from '../hooks/useGetStandings'

// import * as NhlAPI from '../services/nhlAPI'

// import { StandingsResult, TeamRecords } from '../types'

const Schedule = () => {
	// const [error, setError] = useState<string|null>(null)
	// const [isError, setIsError] = useState(false)
	// const [isLoading, setIsLoading] = useState(false)

	// const [teams, setTeams] = useState<TeamRecords[]>([])

	const standings = useGetStandings()

	// const getTeams = async () => {
	// 	setError(null)
	// 	setIsError(false)
	// 	setIsLoading(true)

	// 	try {
	// 		const res = await NhlAPI.get<StandingsResult>('standings/byLeague')
	// 		setTeams(res.records[0].teamRecords)

	// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// 	} catch (err: any) {
	// 		setError(err.message || `Something went wrong when fetching teams`)
	// 		setIsError(true)
	// 	}
	// 	setIsLoading(false)
	// }

	// useEffect(() => {
	// 	getTeams()
	// }, [])

	if (standings.isError) return <Alert variant='warning'>Error fetching teams</Alert>

	return(
		<>
			{standings.isFetching && (
				<div>
					<Spinner animation='border' className='mt-4' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			)}

			{/* <Table size='sm' striped>
				<tbody>
					{teams.map(team => (
						<Team
							key={team.team.id}
							team={team}
						/>
					))}
				</tbody>
			</Table> */}
		</>
	)
}

export default Schedule

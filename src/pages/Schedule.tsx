import Team from '../components/Team'
import Table from 'react-bootstrap/Table'
import type { Player, Team as TTeam, TeamRecord } from '../types'

interface IProps {
	players?: Player[]
	teamRecords?: TeamRecord[]
	teams?: TTeam[]
}

const Schedule: React.FC<IProps> = ({ players, teamRecords, teams }) => (
	<Table size='sm' striped>
		<tbody>
			{teamRecords?.map((teamRecord, index) => (
				<Team
					key={index}
					players={players?.filter(
						(player) => player.teamAbbrev === teamRecord.teamAbbrev.default
					)}
					teamRecord={teamRecord}
					teams={teams}
				/>
			))}
		</tbody>
	</Table>
)

export default Schedule

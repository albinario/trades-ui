import Week from './Week'
import { getLogo } from '../helpers/getLogo'
import moment from 'moment'
import Image from 'react-bootstrap/Image'
import { TeamRecords } from '../types'

interface IProps {
	team: TeamRecords
}

const Team: React.FC<IProps> = (props) => {
	return (
		<tr>
			<td>
				{props.team.leagueRank}
			</td>
			<td>
				{props.team.leagueL10Rank}
			</td>
			<td>
				{props.team.divisionRank}
			</td>
			<td>
				<Image src={getLogo(props.team.team.id)} fluid />
			</td>
			<td>
				{props.team.team.name}
			</td>
			<td>
				{props.team.streak.streakCode}
			</td>
			<td>
				{props.team.leagueRecord.wins}-{props.team.leagueRecord.losses}-{props.team.leagueRecord.ot}
			</td>
			<td>
				{props.team.goalsScored}-{props.team.goalsAgainst}
			</td>
			<td>
				{(props.team.pointsPercentage * 100).toFixed()}%
			</td>
			<td>
				<Week
					teamId={props.team.team.id}
					startDate={moment().format("YYYY-MM-DD")}
					endDate={moment().add(6, 'days').format("YYYY-MM-DD")}
				/>
			</td>
			<td>
				<Week
					teamId={props.team.team.id}
					startDate={moment().add(7, 'days').format("YYYY-MM-DD")}
					endDate={moment().add(13, 'days').format("YYYY-MM-DD")}
				/>
			</td>
			<td>
				<Week
					teamId={props.team.team.id}
					startDate={moment().add(14, 'days').format("YYYY-MM-DD")}
					endDate={moment().add(20, 'days').format("YYYY-MM-DD")}
				/>
			</td>
			<td>
				month
			</td>
		</tr>
	)
}

export default Team

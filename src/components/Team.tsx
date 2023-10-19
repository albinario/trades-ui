import Week from './Week'
import { getLogo } from '../helpers/getLogo'
import { useGetGames } from '../hooks/useGetGames'
import moment from 'moment'
import Image from 'react-bootstrap/Image'
import type { TeamRecords } from '../types'

interface IProps {
	team: TeamRecords
}

const Team: React.FC<IProps> = (props) => {
	const dateFormat = "YYYY-MM-DD"
	const { data: games, isError } = useGetGames(props.team.team.id, moment().format(dateFormat), moment().add(1, 'month').format(dateFormat))

	if (isError) alert("Error fetching dates")

	const week1Start = moment().format(dateFormat)
	const week1End = moment().add(6, 'days').format(dateFormat)
	const week2Start = moment().add(7, 'days').format(dateFormat)
	const week2End = moment().add(13, 'days').format(dateFormat)
	const week3Start = moment().add(14, 'days').format(dateFormat)
	const week3End = moment().add(20, 'days').format(dateFormat)
	
	return games ? (
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
					dates={games.dates.filter(date => date.date <= week1End)}
					startDate={week1Start}
					endDate={week1End}
				/>
			</td>
			<td>
				<Week
					teamId={props.team.team.id}
					dates={games.dates.filter(date => date.date >= week2Start && date.date <= week2End)}
					startDate={week2Start}
					endDate={week2End}
				/>
			</td>
			<td>
				<Week
					teamId={props.team.team.id}
					dates={games.dates.filter(date => date.date >= week3Start && date.date <= week3End)}
					startDate={week3Start}
					endDate={week3End}
				/>
			</td>
			<td>
				{games.totalGames}
			</td>
		</tr>
	) : <></>
}

export default Team

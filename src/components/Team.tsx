import Logo from './Logo'
import Week from './Week'
import { useGetSchedule } from '../hooks/useGetSchedule'
import moment from 'moment'
import type { Player, TeamRecord, TeamValue } from '../types'

interface IProps {
	players?: Player[]
	teamRecord: TeamRecord
	teamValues: TeamValue[]
}

const Team: React.FC<IProps> = (props) => {
	const dateFormat = "YYYY-MM-DD"
	const { data: schedule, isError } = useGetSchedule(props.teamRecord.team.id, moment().format(dateFormat), moment().add(1, 'month').format(dateFormat))

	if (isError) alert("Error fetching games")

	const week1Start = moment().format(dateFormat)
	const week1End = moment().add(6, 'days').format(dateFormat)
	const week2Start = moment().add(7, 'days').format(dateFormat)
	const week2End = moment().add(13, 'days').format(dateFormat)
	const week3Start = moment().add(14, 'days').format(dateFormat)
	const week3End = moment().add(20, 'days').format(dateFormat)
	const week4Start = moment().add(21, 'days').format(dateFormat)
	const week4End = moment().add(27, 'days').format(dateFormat)
	
	return schedule ? (
		<tr>
			<td>
				{props.teamRecord.leagueRank}
			</td>
			<td>
				{props.teamRecord.leagueL10Rank}
			</td>
			<td>
				{props.teamRecord.divisionRank}
			</td>
			<td className='text-center'>
				<Logo teamId={props.teamRecord.team.id} />
			</td>
			<td>
				{props.teamRecord.team.name}
			</td>
			<td>
				{props.teamRecord.streak.streakCode}
			</td>
			<td>
				{props.teamRecord.leagueRecord.wins}-{props.teamRecord.leagueRecord.losses}-{props.teamRecord.leagueRecord.ot}
			</td>
			<td>
				{props.teamRecord.goalsScored}-{props.teamRecord.goalsAgainst}
			</td>
			<td>
				{(props.teamRecord.pointsPercentage * 100).toFixed()}%
			</td>
			<td>
				<Week
					dates={schedule.dates.filter(date => date.date <= week1End)}
					endDate={week1End}
					startDate={week1Start}
					teamId={props.teamRecord.team.id}
					teamValues={props.teamValues}
				/>
			</td>
			<td>
				<Week
					dates={schedule.dates.filter(date => date.date >= week2Start && date.date <= week2End)}
					endDate={week2End}
					startDate={week2Start}
					teamId={props.teamRecord.team.id}
					teamValues={props.teamValues}
				/>
			</td>
			<td>
				<Week
					dates={schedule.dates.filter(date => date.date >= week3Start && date.date <= week3End)}
					endDate={week3End}
					startDate={week3Start}
					teamId={props.teamRecord.team.id}
					teamValues={props.teamValues}
				/>
			</td>
			<td>
				<Week
					dates={schedule.dates.filter(date => date.date >= week4Start && date.date <= week4End)}
					endDate={week4End}
					startDate={week4Start}
					teamId={props.teamRecord.team.id}
					teamValues={props.teamValues}
				/>
			</td>
			<td>
				{schedule.totalGames}
			</td>
			<td className='text-end'>
				{props.players?.filter(player => player.picker === 'A').sort((a,b) => a.jersey - b.jersey).map(player => player.jersey).join(', ')}
			</td>
			<td className='text-center'>
				<Logo teamId={props.teamRecord.team.id} />
			</td>
			<td>
				{props.players?.filter(player => player.picker !== 'A').sort((a,b) => a.jersey - b.jersey).map(player => `${player.picker}${player.jersey}`).join(', ')}
			</td>
		</tr>
	) : <></>
}

export default Team

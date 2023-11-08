import Week from './Week'
import { getLogoUrl } from '../helpers/getLogoUrl'
import { useGetGames } from '../hooks/useGetGames'
import moment from 'moment'
import type { Player, TeamRecord, TeamValue } from '../types'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'

interface IProps {
	players?: Player[]
	teamRecord: TeamRecord
	teamValues: TeamValue[]
}

const Team: React.FC<IProps> = ({ players, teamRecord, teamValues }) => {
	const dateFormat = 'YYYY-MM-DD'
	const { data: games, isError } = useGetGames(teamRecord.teamAbbrev.default)

	if (isError) return <Alert variant='warning'>Error fetching team</Alert>

	const week1Start = moment().format(dateFormat)
	const week1End = moment().add(6, 'days').format(dateFormat)
	const week2Start = moment().add(7, 'days').format(dateFormat)
	const week2End = moment().add(13, 'days').format(dateFormat)
	const week3Start = moment().add(14, 'days').format(dateFormat)
	const week3End = moment().add(20, 'days').format(dateFormat)
	const week4Start = moment().add(21, 'days').format(dateFormat)
	const week4End = moment().add(27, 'days').format(dateFormat)

	return games ? (
		<tr>
			<td>{teamRecord.leagueSequence}</td>
			<td>{teamRecord.leagueL10Sequence}</td>
			<td className='text-center'>
				<Image src={getLogoUrl(teamRecord.teamAbbrev.default)} />
			</td>
			<td>{teamRecord.teamName.default}</td>
			<td>
				{teamRecord.l10Wins}-{teamRecord.l10Losses}-{teamRecord.l10OtLosses}
			</td>
			<td>
				{teamRecord.l10GoalsAgainst}-{teamRecord.l10GoalsFor}
			</td>
			<td>
				{teamRecord.streakCode}
				{teamRecord.streakCount}
			</td>
			<td>
				{teamRecord.wins}-{teamRecord.losses}-{teamRecord.otLosses}
			</td>
			<td>
				{teamRecord.goalFor}-{teamRecord.goalAgainst}
			</td>
			<td>
				<span className='home'>
					{teamRecord.homeWins}-{teamRecord.homeLosses}-
					{teamRecord.homeOtLosses}
				</span>
			</td>
			<td>
				<span className='home'>
					{teamRecord.homeGoalsFor}-{teamRecord.homeGoalsAgainst}
				</span>
			</td>
			<td>
				{teamRecord.roadWins}-{teamRecord.roadLosses}-{teamRecord.roadOtLosses}
			</td>
			<td>
				{teamRecord.roadGoalsFor}-{teamRecord.roadGoalsAgainst}
			</td>

			<td>{(teamRecord.pointPctg * 100).toFixed()}%</td>
			<td>
				<Week
					games={games.filter(
						(game) => game.gameDate >= week1Start && game.gameDate <= week1End
					)}
					endDate={week1End}
					startDate={week1Start}
					teamAbbrev={teamRecord.teamAbbrev.default}
					teamValues={teamValues}
				/>
			</td>
			<td>
				<Week
					games={games.filter(
						(game) => game.gameDate >= week2Start && game.gameDate <= week2End
					)}
					endDate={week2End}
					startDate={week2Start}
					teamAbbrev={teamRecord.teamAbbrev.default}
					teamValues={teamValues}
				/>
			</td>
			<td>
				<Week
					games={games.filter(
						(game) => game.gameDate >= week3Start && game.gameDate <= week3End
					)}
					endDate={week3End}
					startDate={week3Start}
					teamAbbrev={teamRecord.teamAbbrev.default}
					teamValues={teamValues}
				/>
			</td>
			<td>
				<Week
					games={games.filter(
						(game) => game.gameDate >= week4Start && game.gameDate <= week4End
					)}
					endDate={week4End}
					startDate={week4Start}
					teamAbbrev={teamRecord.teamAbbrev.default}
					teamValues={teamValues}
				/>
			</td>
			<td className='text-end'>
				{players
					?.filter((player) => player.picker === 'A')
					.sort((a, b) => a.jersey - b.jersey)
					.map((player) => player.jersey)
					.join(', ')}
			</td>
			<td className='text-center'>
				<Image src={getLogoUrl(teamRecord.teamAbbrev.default)} />
			</td>
			<td>
				{players
					?.filter((player) => player.picker !== 'A')
					.sort((a, b) => a.jersey - b.jersey)
					.map((player) => `${player.picker}${player.jersey}`)
					.join(', ')}
			</td>
		</tr>
	) : (
		<></>
	)
}

export default Team

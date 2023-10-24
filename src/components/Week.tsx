import classNames from 'classnames'
import { getLogo } from '../helpers/getLogo'
import moment from 'moment'
import Image from 'react-bootstrap/Image'
import type { Date, TeamValue } from '../types'

interface IProps {
	dates: Date[]
	endDate: string
	startDate: string
	teamId: number
	teamValues: TeamValue[]
}

const Week: React.FC<IProps> = (props) => {
	let prevDate = ''
	let value = 0

	console.log(props.teamId === 1 && props.teamValues);
	

	return (
		<>
			{props.dates.map(date => {
				const game = date.games[0]
				let home = false
				let opponent = game.teams.home.team.id

				if (props.teamId === game.teams.home.team.id) {
					home = true
					opponent = game.teams.away.team.id
				}

				const cssClasses = classNames({
					'back-back': moment(date.date).subtract(1, 'days').format('YYYY-MM-DD') === prevDate,
					'home': home,
					'first': date.date === props.startDate,
					'last': date.date === props.endDate
				})
				prevDate = date.date

				const oppValue = props.teamValues.find(team => team.teamId === opponent)?.value
				if (oppValue) value = value + oppValue

				return (
					<Image
						className={cssClasses}
						fluid
						key={game.gamePk}
						src={getLogo(opponent)}
						title={`${date.date}`}
					/>
				)
			})}
			{} {value}
		</>
	)
}

export default Week

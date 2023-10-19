import classNames from 'classnames'
import { getLogo } from '../helpers/getLogo'
import moment from 'moment'
import Image from 'react-bootstrap/Image'
import type { Date } from '../types'

interface IProps {
	teamId: number
	dates: Date[]
	startDate: string
	endDate: string
}

const Week: React.FC<IProps> = (props) => {
	let prevDate = ''

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
		</>
	)
}

export default Week

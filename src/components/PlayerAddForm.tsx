import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import type { Player, Team } from '../types'

const PlayerAdd = (props: {
	teams: Team[]
	onSubmit: (player: Player) => void
}) => {
	const [id, setId] = useState(0)
	const [jersey, setJersey] = useState(0)
	const [name, setName] = useState('')
	const [picker, setPicker] = useState('')
	const [pos, setPos] = useState('')
	const [teamAbbrev, setTeamAbbrev] = useState('')

	const playerAdd = (e: React.FormEvent) => {
		e.preventDefault()

		if (!teamAbbrev || !pos || !jersey || !picker || !id)
			return alert('Missing values')

		const playerNew: Player = {
			id,
			name,
			jersey,
			pos,
			teamAbbrev,
			picker,
		}

		props.onSubmit(playerNew)

		setId(0)
		setJersey(0)
		setName('')
		setPicker('')
		setPos('')
	}

	return (
		<Form onSubmit={playerAdd}>
			<Row className='g-1'>
				<Col>
					<Form.Control
						onChange={(e) => setName(e.target.value)}
						placeholder='Name'
						required
						type='text'
						value={name}
					/>
				</Col>

				<Col>
					<Form.Control
						onChange={(e) => setId(Number(e.target.value))}
						placeholder='id'
						type='number'
						value={id ? id : ''}
					/>
				</Col>

				<Col>
					<Form.Select onChange={(e) => setTeamAbbrev(e.target.value)}>
						<option value={''}>Team</option>
						{props.teams
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((team, index) => (
								<option key={index} value={team.abbrev}>
									{team.name}
								</option>
							))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						onChange={(e) => setPicker(e.target.value)}
						placeholder='Picker'
						type='text'
						value={picker}
					/>
				</Col>

				<Col>
					<Form.Control
						onChange={(e) => setJersey(Number(e.target.value))}
						placeholder='Jersey'
						type='number'
						value={jersey ? jersey : ''}
					/>
				</Col>

				<Col>
					<Form.Control
						onChange={(e) => setPos(e.target.value)}
						placeholder='Pos'
						type='text'
						value={pos}
					/>
				</Col>

				<Col>
					<Button
						type='submit'
						className='form-control'
						variant='outline-success'
					>
						+
					</Button>
				</Col>
			</Row>
		</Form>
	)
}

export default PlayerAdd

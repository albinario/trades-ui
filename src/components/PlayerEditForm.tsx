import { useUpdatePlayer } from '../hooks/usePlayers'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import type { Player, Team } from '../types'

interface IProps {
	playersAll?: Player[]
	teams?: Team[]
}

const PlayerEditForm: React.FC<IProps> = ({ playersAll, teams }) => {
	const [jersey, setJersey] = useState(0)
	const [picker, setPicker] = useState('')
	const [playerToEditId, setPlayerToEditId] = useState(0)
	const [pos, setPos] = useState('')
	const [search, setSearch] = useState('')
	const [teamAbbrev, setTeamAbbrev] = useState('')

	const updatePlayer = useUpdatePlayer()

	const playerEdit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!playerToEditId) return alert('No player chosen')

		const playerToEdit: Partial<Player> = {
			id: playerToEditId,
			picker,
			teamAbbrev,
			jersey,
			pos,
		}

		updatePlayer.mutate(playerToEdit)

		setSearch('')
		setPicker('')
		setJersey(0)
		setPos('')
	}

	return (
		<Form onSubmit={playerEdit}>
			<Row className='g-1'>
				<Col>
					<Form.Control
						onChange={(e) => setSearch(e.target.value)}
						placeholder='Search'
						type='text'
						value={search}
					/>
				</Col>

				<Col>
					<Form.Select
						onChange={(e) => setPlayerToEditId(Number(e.target.value))}
					>
						<option value={0}>Player</option>
						{playersAll
							?.filter((player: Player) =>
								player.name.toLowerCase().includes(search.toLocaleLowerCase())
							)
							.map((player: Player) => (
								<option key={player.id} value={player.id}>
									{player.name}
								</option>
							))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Select onChange={(e) => setTeamAbbrev(e.target.value)}>
						<option value={''}>Team</option>
						{teams
							?.sort((a, b) => a.name.localeCompare(b.name))
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

export default PlayerEditForm

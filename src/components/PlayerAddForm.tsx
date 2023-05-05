import { useState } from 'react'
import { Player, Team } from '../types'
import { tradesApi } from '../util/config'

const PlayerAdd = (props: { playersAdded: Player[], teams: Team[]}) => {
	const [name, setName] = useState('')
	const [team, setTeam] = useState(0)
	const [pos, setPos] = useState('')
	const [jersey, setJersey] = useState(0)
	const [picker, setPicker] = useState('')
	const [id, setId] = useState(0)

	const playerAdd = (e: React.FormEvent) => {
		e.preventDefault()

		if (!team || !pos || !jersey || !picker || !id) {
			console.log("Missing values")
			return
		}

		if (props.playersAdded.find(player => player.id === id)) {
			console.log("Player already exists")
			return
		}

		const playerNew: Player = {
			id,
			name,
			jersey,
			pos,
			team,
			picker
		}

		fetch(`${tradesApi}/players`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(playerNew)
		})
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.error(error))

		setName('')
		setPicker('')
		setTeam(0)
		setJersey(0)
		setPos('')
		setId(0)
	}

	return (
		<form onSubmit={playerAdd}>
			<div className='row g-1'>
				<div className='col'>
					<input
						type='text'
						className='form-control'
						placeholder='Name'
						onChange={e => setName(e.target.value)}
						value={name}
						required
					/>
				</div>

				<div className='col'>
					<select
						className='form-select'
						onChange={e => setTeam(parseInt(e.target.value))}
						defaultValue={'0'}
					>
						<option value={'0'}>Team</option>
						{props.teams.map((team, index) => (
							<option
								key={index}
								value={team.id}
							>{team.name}</option>
						))}
					</select>
				</div>

				<div className='col'>
					<input
						type='text'
						className='form-control'
						placeholder='Picker'
						onChange={e => setPicker(e.target.value)}
						value={picker}
					/>
				</div>

				<div className='col'>
					<input
						type='number'
						className='form-control'
						placeholder='Jersey'
						onChange={e => setJersey(parseInt(e.target.value))}
						value={jersey ? jersey : ''}
					/>
				</div>

				<div className='col'>
					<input
						type='text'
						className='form-control'
						placeholder='Pos'
						onChange={e => setPos(e.target.value)}
						value={pos}
					/>
				</div>

				<div className='col'>
					<input
						type='number'
						className='form-control'
						placeholder='id'
						onChange={e => setId(parseInt(e.target.value))}
						value={id ? id : ''}
					/>
				</div>

				<div className='col'>
					<button
						type='submit'
						className='btn btn-success form-control'
					>+</button>
				</div>
			</div>
		</form>
	)
}

export default PlayerAdd

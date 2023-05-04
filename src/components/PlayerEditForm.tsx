import { useState } from 'react'
import { Player, PlayerToUpdate } from '../types'
import { tradesApi } from '../util/config'

const PlayerEditForm= (props: { playersAdded: Player[] }) => {
	const [search, setSearch] = useState('')
	const [playerToEdit, setPlayerToEdit] = useState(0)
	const [picker, setPicker] = useState('')

	const playerEdit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!playerToEdit) {
			console.log("No player chosen")
			return
		}

		const playerUpdated: PlayerToUpdate = {
			picker
		}

		fetch(`${tradesApi}/players/${playerToEdit}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(playerUpdated)
		})
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.error(error))

		setSearch('')
		setPicker('')
	}

	return (
		<form onSubmit={playerEdit}>
			<div className='row g-1'>
				<div className='col-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Search'
						onChange={e => setSearch(e.target.value)}
						value={search}
					/>
				</div>

				<div className='col-3'>
					<select
						className='form-select'
						onChange={e => setPlayerToEdit(parseInt(e.target.value))}
					>
						<option value={0}>Player</option>
						{props.playersAdded
							.filter(player => player.name.toLowerCase().includes(search.toLocaleLowerCase()))
							.map((player, index) => (
								<option
									key={index}
									value={player.id}
								>{player.name}</option>
							))
						}
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
					<button
						type='submit'
						className='btn btn-success form-control'
					>+</button>
				</div>
			</div>
		</form>
	)
}

export default PlayerEditForm

import axios from 'axios'
import type { Player, PlayersResponse } from '../types'

const instance = axios.create({
	baseURL: 'https://trades.cyclic.app/players',
	timeout: 10000,
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getPlayers = async () => {
	const playersResponse = await get<PlayersResponse>('')
	return playersResponse.data.filter((player) => player.picker)
}

export const createPlayer = (player: Player) => {
	return instance.post('/', player)
}

export const updatePlayer = (player: Partial<Player>) => {
	return instance.patch('/' + player.id, player)
}

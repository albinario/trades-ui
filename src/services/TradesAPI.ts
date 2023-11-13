import axios from 'axios'
import type { Player, PlayersResponse } from '../types'

const BASE_URL = 'https://trades.cyclic.app/players'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getPlayers = async () => {
	const res = await get<PlayersResponse>('')
	return res.data
}

export const createPlayer = (player: Player) => {
	return instance.post('/', player)
}

export const updatePlayer = (player: Partial<Player>) => {
	return instance.patch('/' + player.id, player)
}

import axios from 'axios'
import type { Player, PlayersResponse } from '../types'

const BASE_URL = 'https://trades.cyclic.app/players'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getPlayers = async () => {
	const playersResponse = await get<PlayersResponse>('')
	return playersResponse.data.filter(player => player.picker)
}

export const createPlayer = (player: Player) => {
	return axios.post(BASE_URL, player)
}

export const updatePlayer = (player: Partial<Player>) => {
	return axios.patch(BASE_URL + '/' + player.id, player)
}

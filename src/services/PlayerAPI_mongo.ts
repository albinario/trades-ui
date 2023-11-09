import axios from 'axios'
import type { Player, PlayersResponse } from '../types'

const BASE_URL = 'https://eu-central-1.aws.data.mongodb-api.com/app/data-ksvuh/endpoint/data/v1'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': import.meta.env.VITE_MONGO_API_KEY,
    },
})

const get = async <T>(endpoint = '') => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getPlayers = async () => {
	const playersResponse = await get<PlayersResponse>()
	return playersResponse.data.filter(player => player.picker)
}

export const createPlayer = (player: Player) => {
	return axios.post(BASE_URL, player)
}

export const updatePlayer = (player: Partial<Player>) => {
	return axios.patch(BASE_URL + '/' + player.id, player)
}

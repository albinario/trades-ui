import axios from 'axios'
import type { PlayersResponse } from '../types'

const BASE_URL = 'https://trades.cyclic.app'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getPlayers = async () => {
	const res = await get<PlayersResponse>('/players')
	return res.data
}

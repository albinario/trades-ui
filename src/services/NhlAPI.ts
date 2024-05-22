import axios from 'axios'
import type { Game, TeamRecord } from '../types'

const instance = axios.create({
	baseURL: 'https://nhl-proxy.onrender.com',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

export const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getGames = (teamAbbrev: string) =>
	get<Game[]>('/games/' + teamAbbrev)

export const getTeamRecords = () => get<TeamRecord[]>('/standings')

import axios from 'axios'
import type { Game, TeamRecord } from '../types'

const instance = axios.create({
	baseURL: 'https://api-web.nhle.com/v1',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

export const get = async <T>(endpoint: string) => {
	const response = await instance.get(endpoint)
	return response.data as T
}

export const getGames = (teamAbbrev: string) =>
	get<Game[]>('/club-schedule-season/' + teamAbbrev + '/now')

export const getTeamRecords = () => get<TeamRecord[]>('/standings/now')

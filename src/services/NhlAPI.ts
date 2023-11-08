import axios from 'axios'
import type { Game, TeamRecord, TeamsResponse } from '../types'

const instance = axios.create({
	baseURL: 'http://localhost:3000',
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
	get<Game[]>('/games/' + teamAbbrev)

export const getTeamRecords = () => get<TeamRecord[]>('/standings')

export const getTeams = async () => {
	const res = await get<TeamsResponse>('teams')
	return res.teams
}

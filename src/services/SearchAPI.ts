import axios from 'axios'
import { PlayerSearch, type Game, type TeamRecord } from '../types'

const instance = axios.create({
	baseURL: 'https://search.d3.nhle.com/api/v1/search/player',
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

export const searchPlayers = async (searchInput: string) =>
	get<PlayerSearch[]>('?culture=en-us&limit=20&active=true&q=' + searchInput)

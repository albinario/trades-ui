import axios from 'axios'
import type { ScheduleResponse, StandingsResult, TeamsResponse } from '../types'

const instance = axios.create({
	baseURL: 'https://statsapi.web.nhl.com/api/v1',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
})

export const get = async <T>(endpoint: string) => {
	const response = await instance.get(`${endpoint}`)
	return response.data as T
}

export const getSchedule = (teamId: number, startDate: string, endDate: string) => {
	return get<ScheduleResponse>(`schedule?teamId=${teamId}&startDate=${startDate}&endDate=${endDate}`)
	
}

export const getStandings = () => {
	return get<StandingsResult>('standings/byLeague')
}

export const getTeams = async () => {
	const res = await get<TeamsResponse>('teams')
	return res.teams
}

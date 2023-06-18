import axios from 'axios'

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
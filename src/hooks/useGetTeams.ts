import { useQuery } from '@tanstack/react-query'
import { getTeams } from '../services/NhlAPI'

export const useGetTeams = () => {
	return useQuery({
		queryKey: ['teams'],
		queryFn: getTeams
	})
}

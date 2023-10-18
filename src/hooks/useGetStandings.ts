import { useQuery } from '@tanstack/react-query'
import { getStandings } from '../services/NhlAPI'

export const useGetStandings = () => {
	return useQuery({
		queryKey: ['standings'],
		queryFn: getStandings
	})
}
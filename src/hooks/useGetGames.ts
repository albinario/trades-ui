import { useQuery } from '@tanstack/react-query'
import { getGames } from '../services/NhlAPI'

export const useGetGames = (id: number, startDate: string, endDate: string) => {
	return useQuery({
		queryKey: ['games', id],
		queryFn: () => getGames(id, startDate, endDate)
	})
}

import { useQuery } from '@tanstack/react-query'
import { getGames } from '../services/NhlAPI'

export const useGetGames = (teamAbbrev: string) => {
	return useQuery({
		queryKey: ['games', teamAbbrev],
		queryFn: () => getGames(teamAbbrev),
	})
}

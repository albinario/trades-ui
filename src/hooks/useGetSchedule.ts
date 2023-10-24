import { useQuery } from '@tanstack/react-query'
import { getSchedule } from '../services/NhlAPI'

export const useGetSchedule = (teamId: number, startDate: string, endDate: string) => {
	return useQuery({
		queryKey: ['schedule', teamId],
		queryFn: () => getSchedule(teamId, startDate, endDate)
	})
}

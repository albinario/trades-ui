import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPlayer, updatePlayer } from '../services/PlayerAPI'
import { getPlayers } from '../services/TradesAPI'
import { TPlayer } from '../types'

const queryKey = ['players']

export const useGetPlayers = () => {
	return useQuery({
		queryKey,
		queryFn: getPlayers
	})
}

export const useUpdatePlayer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (playerEdited: Partial<TPlayer>) => updatePlayer(playerEdited),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey
			})
		}
	})
}

export const useCreatePlayer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (playerToAdd: TPlayer) => createPlayer(playerToAdd),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey
			})
		}
	})
}
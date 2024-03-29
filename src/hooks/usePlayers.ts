import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPlayer, getPlayers, updatePlayer } from '../services/TradesAPI'
import type { Player } from '../types'

const queryKey = ['players']

export const useGetPlayers = () =>
	useQuery({
		queryKey,
		queryFn: getPlayers,
	})

export const useUpdatePlayer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (playerEdited: Partial<Player>) => updatePlayer(playerEdited),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey,
			})
		},
	})
}

export const useCreatePlayer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (playerToAdd: Player) => createPlayer(playerToAdd),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey,
			})
		},
	})
}

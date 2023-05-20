import axios from 'axios'
import { tradesApi } from '../util/config'
import { Player } from '../types'

export const getPlayers = async () => {
	const res = await axios.get(tradesApi)
	return res.data.data as Player[]
}

export const addPlayer = async (player: Player) => {
	const res = await axios.post(tradesApi, player)
	return res.data
}

export const editPlayer = async (player: Partial<Player>) => {
	const res = await axios.patch(tradesApi+'/'+player.id, player)
	return res.data
}
import axios from 'axios'
import { tradesApi } from '../util/config'
import { TPlayer } from '../types'

export const getPlayers = async () => {
	const res = await axios.get(tradesApi)
	return res.data.data as TPlayer[]
}

export const createPlayer = async (player: TPlayer) => {
	const res = await axios.post(tradesApi, player)
	return res.data
}

export const updatePlayer = async (player: Partial<TPlayer>) => {
	const res = await axios.patch(tradesApi+'/'+player.id, player)
	return res.data
}
export type Player = {
	id: number
	name: string
	jersey: number
	pos: string
	team: number
	picker: string
}

export type PlayerToUpdate = {
	picker: string
}

export type Team = {
	id: number
	name: string
}

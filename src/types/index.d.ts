export type TPlayer = {
	id: number
	name: string
	jersey: number
	pos: string
	team: number
	picker: string
}

export type Team = {
	id: number
	name: string
}

export type TeamsResponse = {
	teams: Team[]
}

export type TeamRecords = {
	divisionRank: string
	gamesPlayed: number
	goalsAgainst: number
	goalsScored: number
	leagueL10Rank: string
	leagueRank: string
	leagueRecord: {
		wins: number
		losses: number
		ot: number
	}
	pointsPercentage: number
	streak: {
		streakCode: string
	}
	team: Team
}

export type StandingsResult = {
	records: {
		teamRecords: TeamRecords[]
	}[]
}

export type Game = {
	gamePk: number
	teams: {
		away: {
			team: Team
		}
		home: {
			team: Team
		}
	}
}

export type GamesResult = {
	dates: {
		date: string
		games: Game[]
	}[]
}

export type PlayersResponse = {
	data: TPlayer[]
}

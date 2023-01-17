
export class Bet {
    constructor(id, game, odd, total) {
        this.id = id
        this.gameId = game.id
        this.gameName = `${game.homeTeam} - ${game.awayTeam}`
        this.result = odd.name
        this.oddId = odd.id
        this.odd = odd.value
        this.total = total
        this.commenceTime = game.commenceTime
    }
}


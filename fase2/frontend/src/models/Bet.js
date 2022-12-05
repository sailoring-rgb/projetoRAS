
export class Bet {
    constructor(game, odd) {
        this.id = game.id + '_' + odd.name
        this.gameId = game.id
        this.gameName = `${game.homeTeam} - ${game.awayTeam}`
        this.result = odd.name
        this.oddId = odd.id
        this.odd = odd.value
        this.total = 1.0
        this.commenceTime = game.commenceTime
    }
}


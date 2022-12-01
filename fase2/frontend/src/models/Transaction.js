export class Bet {
    constructor(game, odd, transaction) {
        this.id = game.id + '_' + odd.name
        this.gameId = game.id
        this.gameName = `${game.homeTeam} - ${game.awayTeam}`
        this.result = odd.name
        this.odd = odd.value
        this.transaction = transaction
    }
}

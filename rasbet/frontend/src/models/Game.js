
export class Game {
    constructor(id, homeTeam, awayTeam, commenceTime, oddsKey, isFollowed) {
        this.id = id
        this.homeTeam = homeTeam
        this.awayTeam = awayTeam
        this.commenceTime = commenceTime
        this.oddsKey = oddsKey
        this.odds = {}
        this.isFollowed = isFollowed
    }
}
import Service from './Service';

class PlayerService extends Service {
    constructor(model) {
        super(model);
        this.appendDkpEntry = this.appendDkpEntry.bind(this);
    }

    async insert(data) {
        return super.insert(data);
    }

    async update(user) {

        try {
            console.log("update: " + JSON.stringify(user));
            const {mail} = user;
            let item = await this.model.update({mail: mail}, user, {new: true});
            return {
                error: false,
                statusCode: 202,
                item
            };
        } catch (error) {
            console.log(error)
            return {
                error: true,
                statusCode: 500,
            };
        }
    }

    async appendDkpEntry(dkpEntry, mail) {
        try {
            console.log("dkp entry add request for: " + JSON.stringify(mail));
            const playerLookup = await this.get(mail);
            if (playerLookup.player) {
                const player = playerLookup.player;
                console.log("before: " + player);
                player.dkpHistory.push(dkpEntry);
                player.dkp = player.dkp + dkpEntry.dkp > 800 ? player.dkp = 800 : player.dkp + dkpEntry.dkp < 0 ? 0 : player.dkp + dkpEntry.dkp;
                console.log("after: " + player);
                let item = await this.model.update({mail: player.mail}, player, {new: true});
                return {
                    error: false,
                    statusCode: 202,
                    item
                };
            }
            return {
                error: true,
                statusCode: 404,
            };
        } catch (error) {
            console.log(error)
            return {
                error: true,
                statusCode: 500,
            };
        }
    }


    async get(mail) {
        try {
            let player = await this.model.findOne({mail: mail});
            if (!player) {
                return {
                    error: true,
                    statusCode: 404,
                    message: "player not found"
                }
            }
            return {
                error: false,
                statusCode: 200,
                player
            }
        } catch (e) {
            return {
                error: true,
                statusCode: 500,
                errors: e.errors
            }
        }
    }

}

export default PlayerService;

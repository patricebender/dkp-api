import Service from './Service';

class PlayerService extends Service {
    constructor(model) {
        super(model);
        this.dkpUpdate = this.dkpUpdate.bind(this);
    }

    async insert(data) {
        return super.insert(data);
    }

    async update(user) {

        try {
            console.log("update: " + JSON.stringify(user));
            const {mail} = user;
            let item = await this.model.updateOne({mail: mail}, user, {new: true});
            return {
                error: false,
                statusCode: 202,
                item
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                statusCode: 500,
            };
        }
    }

    async dkpUpdate(dkpEntry, mail) {
        try {
            console.log("dkpUpdate: " + JSON.stringify(dkpEntry));
            const dkp = dkpEntry.dkp;
            const playerLookup = await this.get(mail);

            if (playerLookup.player) {
                const player = playerLookup.player;
                player.dkp = player.dkp + dkp > 800 ? 800 : player.dkp + dkp < 0 ? 0 : player.dkp + dkp;
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
            console.log(error);
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

import Service from './Service';

class PlayerService extends Service {
    constructor(model) {
        super(model);
    }

    async insert(data) {
        return super.insert(data);
    }

    async get(mail) {
        try {
            let player = await this.model.findOne({mail: mail});
            console.log(JSON.stringify(player))
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
                error: false,
                statusCode: 500,
            }
        }


    }

}

export default PlayerService;

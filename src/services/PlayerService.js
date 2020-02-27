import Service from './Service';

class PlayerService extends Service {
    constructor(model) {
        super(model);
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

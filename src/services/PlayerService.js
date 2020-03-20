import Service from './Service';
import DkpEntry from "../models/DkpEntry";
import mongoose from "mongoose";

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
            console.log("update: " + JSON.stringify(user.ingameName));
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
            console.log("dkpUpdate: " + dkpEntry);
            const dkp =  parseInt(dkpEntry.dkp);
            const playerLookup = await this.getByMail(dkpEntry.player);
            console.log("player lookup: " + JSON.stringify(playerLookup));
            if (playerLookup.player) {

                const player = playerLookup.player;
                console.log( player.dkp + dkp);
                player.dkp = player.dkp + dkp > 800 ? 800 : player.dkp + dkp;
                console.log(playerLookup.player, dkpEntry);
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


    async getByMail(mail) {
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

    async getAll(query) {
        let {skip, limit} = query;

        skip = skip ? Number(skip) : 0;
        // TODO Change to scroll pagination in frontend
        limit = limit ? Number(limit) : 100;

        delete query.skip;
        delete query.limit;

        if (query._id) {
            try {
                query._id = new mongoose.mongo.ObjectId(query._id);
            } catch (error) {
                console.log("not able to generate mongoose id with content", query._id);
            }
        }

        try {
            let items = await this.model
                .find(query)
                .sort({dkp: -1})
                .skip(skip)
                .limit(limit);
            let total = await this.model.count();

            return {
                error: false,
                statusCode: 200,
                data: items,
                total
            };
        } catch (errors) {
            return {
                error: true,
                statusCode: 500,
                errors
            };
        }
    }


}

export default PlayerService;

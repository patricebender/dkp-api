import Service from './Service';
import mongoose from "mongoose";

class DkpService extends Service {
    constructor(model) {
        super(model);
    }

    async getAllForOnePlayer(query) {
        let {skip, limit, mail} = query;
        console.log("get all DKP Entries for " + mail);

        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;

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
                .find({player: mail})
                .sort({date: -1})
                .skip(skip)
                .limit(limit)

            ;
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

    async insertMany(data) {
        try {
            let item = await this.model.insertMany(data);
            if (item)
                return {
                    error: false,
                    item,
                    statusCode: 200,
                };
        } catch (error) {
            console.log("error", error);
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || "Not able to create item",
                errors: error.errors
            };
        }
    }

}



export default DkpService;

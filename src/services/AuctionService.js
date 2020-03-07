import Service from './Service';
import mongoose from "mongoose";

class AuctionService extends Service {
    constructor(model) {
        super(model);
    }


    async insert(data) {
        console.log("insert auction: " + data)
        return super.insert(data);
    }

    async insertBid(id, bid) {
        try {
            const auctionLookup = await this.get(id);

            if (auctionLookup.item) {
                const auction = auctionLookup.item;
                console.log("vorher: " + auction)
                auction.bids = auction.bids.filter((otherBid) => {
                    return otherBid.player._id !== bid.player._id;
                });
                auction.bids.push(bid);
                console.log("nacher: " + auction)
                console.log("Yeah gebot eingefügt");

                return this.update(id, auction);
            }
            return {
                error: true,
                statusCode: 404,
                errorMessage: "auction not found"
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                statusCode: 500,
            };
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
                .sort({isClosed: 1})
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


export default AuctionService;

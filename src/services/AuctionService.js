import Service from './Service';
import mongoose from "mongoose";

class AuctionService extends Service {
    constructor(model) {
        super(model);
    }


    async insert(data) {
        console.log("insert auction: " + data);
        return super.insert(data);
    }

    async removeBid(id, playerMail){
       try {
            const auctionLookup = await this.get(id);

            if (auctionLookup.item) {
                const auction = auctionLookup.item;
                console.log("vorher: " + auction);
                auction.bids = auction.bids.filter((otherBid) => {
                    return otherBid.player.mail !== playerMail;
                });

                auction.playerMails = auction.playerMails.filter((otherMail) => {
                    return otherMail !== playerMail;
                });
                auction.bidCount = auction.bids.length;
                console.log("nacher: " + auction);
                console.log("Yeah gebot gelöscht!");

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

    async insertBid(id, bid) {
        try {
            const auctionLookup = await this.get(id);

            if (auctionLookup.item) {
                const auction = auctionLookup.item;
                console.log("vorher: " + auction);
                auction.bids = auction.bids.filter((otherBid) => {
                    return otherBid.player._id !== bid.player._id;
                });

                auction.playerMails = auction.playerMails.filter((otherMail) => {
                    return otherMail !== bid.player.mail;
                });
                // add email of player to check if already bet on item in frontend
                auction.playerMails.push(bid.player.mail);
                auction.bids.push(bid);
                auction.bidCount = auction.bids.length;
                console.log("nacher: " + auction);
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

    async getAll(query, isAdmin) {
        let {skip, limit} = query;

        skip = skip ? Number(skip) : 0;
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
            const exclude = isAdmin ? {} : {bids: 0};
            console.log(exclude);
            let items = await this.model
                .find(query, exclude)
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

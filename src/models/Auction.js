import mongoose, {Schema} from "mongoose";
import DkpLogType from "./categories/DkpLogType"
import uniqueValidator from "mongoose-unique-validator";
import Player from "./Player";

class Auction {

    initSchema() {
        const schema = new Schema({
            item: {
                type: JSON,
                required: true,
            },
            minBid: {
                type: Number,
                required: true,
            },
            isClosed: {
                type: Boolean,
                required: false,
                default: false
            },
            bids: {
                type: Array,
                required: false,
            },bidCount: {
                type: Number,
                required: false
            },playerMails: {
                type: Array,
                required: false,
                default: []
            },
            winnerBid: {
                type: JSON,
                required: false,
            }

        }, {timestamps: true});

        schema.pre(
            "save",
            function (next) {

                return next();
            },
            function (err) {
                next(err);
            }
        );
        schema.plugin(uniqueValidator);
        mongoose.model("Auction", schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model("Auction");
    }
}

export default Auction;

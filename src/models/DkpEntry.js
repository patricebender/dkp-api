import mongoose, {Schema} from "mongoose";
import DkpLogType from "./categories/DkpLogType"
import uniqueValidator from "mongoose-unique-validator";
import Player from "./Player";

class DkpEntry {

    initSchema() {
        const schema = new Schema({
            dkpLogType: {
                type: DkpLogType,
                required: true,
            },
            reason: {
                type: String,
                required: true,
            },
            dkp: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            author: {
                type: String,
                required: true,
            },
            player: {
                type: String,
                required: true
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
        mongoose.model("DkpEntry", schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model("DkpEntry");
    }
}

export default DkpEntry;

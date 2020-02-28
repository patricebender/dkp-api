import mongoose, {Schema} from "mongoose";
import Spec from "./categories/Spec"
import uniqueValidator from "mongoose-unique-validator";
import Player from "./Player";

class Raid {

    initSchema() {
        const schema = new Schema({
            dungeonName: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            description: {
                type: String,
                required: true
            },
            registrationDeadline: {
                type: Date,
                required: true,
            },
            bench: {
                type: Array,
                required: false,
                unique: true,
            },
            willAttend: {
                type: Array,
                required: false,
                unique: true,
            },
            declined: {
                type: Array,
                required: false,
                unique: true,
            },
            late: {
                type: Array,
                required: false,
                unique: true,
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
        mongoose.model("Raids", schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model("Raids");
    }
}

export default Raid;

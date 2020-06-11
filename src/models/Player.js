import mongoose, {Schema} from "mongoose";
import PlayerClass from "./categories/PlayerClass"
import Spec from "./categories/Spec"
import Talent from "./categories/Talents"
import uniqueValidator from "mongoose-unique-validator";

class Player {

    initSchema() {
        const schema = new Schema({
            ingameName: {
                type: String,
                required: true,
                unique: true
            },
            playerClass: {
                type: PlayerClass,
                required: true,
            },
            mail: {
                type: String,
                required: true,
                unique: true
            },
            spec: {
                type: Spec,
                required: true,
            },
            isAdmin: {
                type: Boolean,
                required: false,
                default: false
            },
            dkp: {
                type: Number,
                required: false,
                default: 0
            },
            talent: {
                type: Talent,
                required:  false,
                default: undefined,

            },
            isRaidlead: {
              type: Boolean,
              required: false,
              default: false
            },
            prefersEnglish: {
                type: Boolean,
                required: false,
                default: true
            },
            dkpRank: {
                type: Number,
                required: false,
                default: 0
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
        mongoose.model("players", schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model("players");
    }
}

export default Player;

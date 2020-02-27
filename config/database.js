import mongoose from "mongoose";

class Connection {
    constructor() {
        const url = `mongodb://mongo:27017/ogkush`;
        console.log("Establish new connection with blabla", url);
        mongoose.Promise = global.Promise;
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useUnifiedTopology", true);
        mongoose.connect(process.env.MONGODB_URI || url)
            .then(r => console.log("connection up bruv"))
            .catch(e => console.error(e));
    }
}

export default new Connection();

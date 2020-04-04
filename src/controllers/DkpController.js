import Controller from './Controller';

import DkpService from "../services/DkpService";
import Raid from "../models/Raid";
import PlayerController from "./PlayerController";
import DkpEntry from "../models/DkpEntry";


const dkpService = new DkpService(
    new DkpEntry().getInstance()
);

class DkpController extends Controller {

    constructor(service) {
        super(service);
        this.getAllEntries = this.getAllEntries.bind(this);
        this.insertMany = this.insertMany.bind(this);
    }

    async getAll(req, res) {
        let response = await this.service.getAll({});
        return res.status(response.statusCode).send(response);
    }

    async insert(req, res) {
        console.log(req + " INSERT DKP Entry" + req.body);
        const playerResponse = await PlayerController.dkpUpdate(req, res);
        console.log(playerResponse);
        await PlayerController.updateDKPRanking();
        return super.insert(req, res);
    }

    async insertMany(req, res) {
        console.log(req + " INSERT Many DKP Entries" + req.body);
        const dkpEntries = req.body;
        let response = await this.service.insertMany(req.body);
        console.log(response);
        for(let dkpEntry of dkpEntries){
            await PlayerController.dkpUpdateByMail(dkpEntry, dkpEntry.player);
        }
        await PlayerController.updateDKPRanking();
        return res.status(response.statusCode).send(response);
    }

    async getAllEntries(req, res) {
        const mail = req.params.mail;
        const skip = req.params.skip;
        let response = await this.service.getAllForOnePlayer({mail, skip});
        return res.status(response.statusCode).send(response);
    }

}

export default new DkpController(dkpService);

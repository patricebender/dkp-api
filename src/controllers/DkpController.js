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
    }

    async getAll(req, res) {
        let response = await this.service.getAll({});
        return res.status(response.statusCode).send(response);
    }

    async insert(req, res) {
        console.log(req + " INSERT DKP Entry" + req.body);
        const playerResponse = await PlayerController.dkpUpdate(req, res);
        console.log(playerResponse);
        return super.insert(req, res);
    }

    async getAllEntries(req, res) {
        const mail = req.params.mail;
        const skip = req.params.skip;
        let response = await this.service.getAllForOnePlayer({mail, skip});
        return res.status(response.statusCode).send(response);
    }

}

export default new DkpController(dkpService);

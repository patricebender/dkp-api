import Controller from './Controller';

import RaidService from "../services/RaidService";
import Raid from "../models/Raid";


const raidService = new RaidService(
    new Raid().getInstance()
);

class RaidController extends Controller {

    constructor(service) {
        super(service);
        this.insertRegistration = this.insertRegistration.bind(this);
    }

    async getAll(req, res) {
        let response = await this.service.getAll({});
        return res.status(response.statusCode).send(response);
    }

    async insert(req, res) {
        console.log(req + " INSERT RAID" + req.body)
        return super.insert(req, res);
    }


   async insertRegistration(req, res) {
        const {raid, player, registrationType} = req.body;
        let response = await this.service.registerForRaid(player, raid, registrationType);
        return res.status(response.statusCode).send(response);
    }
}

export default new RaidController(raidService);

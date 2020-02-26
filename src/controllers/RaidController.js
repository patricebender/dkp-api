import Controller from './Controller';

import RaidService from "../services/RaidService";
import Raid from "../models/Raid";


const raidService = new RaidService(
    new Raid().getInstance()
);

class RaidController extends Controller {

    constructor(service) {
        super(service);
    }

    async getAll(req, res) {
        let response = await this.service.getAll({});
        return res.status(response.statusCode).send(response);
    }


}

export default new RaidController(raidService);

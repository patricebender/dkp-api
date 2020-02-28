import Controller from './Controller';
import PlayerService from "../services/PlayerService";
import Player from "./../models/Player";


const playerService = new PlayerService(
    new Player().getInstance()
);

class PlayerController extends Controller {

    constructor(service) {
        super(service);
        this.addDkpEntry = this.addDkpEntry.bind(this);
    }

    async get(req, res) {
        const mail = req.params.mail;
        let response = await this.service.get(mail);
        return res.status(response.statusCode).send(response);
    }

    async update(req, res) {
        const user = req.body;
        let response = await this.service.update(user);
        return res.status(response.statusCode).send(response);
    }

    async addDkpEntry(req, res) {
        const ingameName = req.params.ingameName;
        const dkpEntry = req.body;
        let response = await this.service.appendDkpEntry(dkpEntry, ingameName);
        return res.status(response.statusCode).send(response);
    }




}

export default new PlayerController(playerService);

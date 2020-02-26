import Controller from './Controller';
import PlayerService from "../services/PlayerService";
import Player from "./../models/Player";


const playerService = new PlayerService(
    new Player().getInstance()
);

class PlayerController extends Controller {

    constructor(service) {
        super(service);
    }

    async get(req, res) {
        const mail = req.params.mail;
        let response = await this.service.get(mail);
        return res.status(response.statusCode).send(response);
    }


}

export default new PlayerController(playerService);

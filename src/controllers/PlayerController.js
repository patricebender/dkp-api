import Controller from './Controller';
import PlayerService from "../services/PlayerService";
import Player from "./../models/Player";


const playerService = new PlayerService(
    new Player().getInstance()
);

class PlayerController extends Controller {

    constructor(service) {
        super(service);
        this.dkpUpdate = this.dkpUpdate.bind(this);
        this.getByMail = this.getByMail.bind(this);
    }

    async getByMail(req, res) {
        const mail = req.params.mail;
        let response = await this.service.getByMail(mail);
        return res.status(response.statusCode).send(response);
    }

    async getById(id) {
        return this.service.get(id);
    }

    async update(req, res) {
        const user = req.body;
        let response = await this.service.update(user);
        return res.status(response.statusCode).send(response);
    }

    async dkpUpdate(req, res) {
        const mail = req.params.mail;
        const dkpEntry = req.body;
        await this.dkpUpdateByMail(dkpEntry, mail);
    }

    async dkpUpdateByMail(dkpEntry, mail) {

        return await this.service.dkpUpdate(dkpEntry, mail);
    }

    async updateDKPRanking() {
        let response = await this.service.getAll({});
        let players = response.data;

        let rank = 1;
        let currentDkp = 0;

        for (const player of players) {
            if (player.dkp < currentDkp) {
                rank += 1;
            }
            player.dkpRank = rank;
            currentDkp = player.dkp;
            await this.service.update(player);
        }

        response = await this.service.getAll({});
         players = response.data;
         console.log(players);
    }


}

export default new PlayerController(playerService);

import Controller from './Controller';
import Auction from "../models/Auction";
import AuctionService from "../services/AuctionService";
import PlayerController from "./PlayerController";


const auctionService = new AuctionService(
    new Auction().getInstance()
);

class AuctionController extends Controller {

    constructor(service) {
        super(service);
        this.insertBid = this.insertBid.bind(this);
        this.removeBid = this.removeBid.bind(this);
    }

    async insertBid(req, res) {
        const bid = req.body;
        const id = req.params.id;
        let response = await this.service.insertBid(id, bid);
        return res.status(response.statusCode).send(response);
    }

    async getAll(req, res) {
        const id = req.params.requesterId;
        const playerResponse = await PlayerController.getById(id);
        console.log(playerResponse.item);
        let response = await this.service.getAll({}, playerResponse.item.isAdmin);
        return res.status(response.statusCode).send(response);
    }

    async removeBid(req, res) {
        const {id, playerMail} = req.params;
        let response = await this.service.removeBid(id, playerMail);
        return res.status(response.statusCode).send(response);
    }


}

export default new AuctionController(auctionService);

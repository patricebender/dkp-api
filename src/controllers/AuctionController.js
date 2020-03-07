import Controller from './Controller';
import Auction from "../models/Auction";
import AuctionService from "../services/AuctionService";


const auctionService = new AuctionService(
    new Auction().getInstance()
);

class AuctionController extends Controller {

    constructor(service) {
        super(service);
        this.insertBid = this.insertBid.bind(this);
    }

    async insertBid(req, res) {
        const bid = req.body;
        const id = req.params.id;
        let response = await this.service.insertBid(id, bid);
        return res.status(response.statusCode).send(response);
    }



}

export default new AuctionController(auctionService);

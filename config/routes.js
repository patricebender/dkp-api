import PlayerController from "../src/controllers/PlayerController";
import OktaJwtVerifier from "@okta/jwt-verifier";
import Player from "../src/models/Player";
import RaidController from "../src/controllers/RaidController";
import DkpController from "../src/controllers/DkpController";
import AuctionController from "../src/controllers/AuctionController";

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-181790.okta.com/oauth2/default',
    clientId: '0oa2gduj6gvLnlHpd4x6',
    assertClaims: {
        aud: 'api://default',
    },
});


export default (server) => {
    // player
    server.get('/players', authenticationRequired, PlayerController.getAll);
    server.get('/player/:mail', authenticationRequired, PlayerController.getByMail);
    server.post('/player', authenticationRequired, PlayerController.insert);
    server.patch('/player', authenticationRequired, PlayerController.update);
    server.patch('/player/dkp/:mail', authenticationRequired, PlayerController.dkpUpdate);
    server.delete('/player/:id', authenticationRequired, PlayerController.delete);


    // DKP
    server.patch('/dkp/:mail', authenticationRequired,  DkpController.insert);
    server.get('/dkp/history/:mail/:skip', authenticationRequired,  DkpController.getAllEntries);
    server.post('/dkp/many', authenticationRequired,  DkpController.insertMany);

    // raids
    server.get('/raids', authenticationRequired, RaidController.getAll);
    server.post('/raid', authenticationRequired, RaidController.insert);
    server.get('/raid/:id', authenticationRequired, RaidController.get);
    server.patch('/raid/register', authenticationRequired, RaidController.insertRegistration);
    server.patch('/raid', authenticationRequired, RaidController.update);
    server.patch('/raid/:id', authenticationRequired, RaidController.update);
    server.delete('/raid/:id', authenticationRequired, RaidController.delete);

    // auctions
    server.get('/auctions/:requesterId', authenticationRequired, AuctionController.getAll);
    server.post('/auction', authenticationRequired, AuctionController.insert);
    server.patch('/auction/bid/:id', authenticationRequired, AuctionController.insertBid);
    server.patch('/auction/close/:id', authenticationRequired, AuctionController.update);
    server.delete('/auction/:id', authenticationRequired, AuctionController.delete);
    server.delete('/auction/:id/bid/:playerMail', authenticationRequired, AuctionController.removeBid);
    server.get('/auction/:id', authenticationRequired, AuctionController.get);


    /**
     * A simple middleware that asserts valid access tokens and sends 401 responses
     * if the token is not present or fails validation.  If the token is valid its
     * contents are attached to req.jwt
     */
    function authenticationRequired(req, res, next) {
        const authHeader = req.headers.authorization || '';
        const match = authHeader.match(/Bearer (.+)/);

        if (!match) {
            return res.status(401).end();
        }

        const accessToken = match[1];
        const expectedAudience = 'api://default';

        return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
            .then((jwt) => {
                req.jwt = jwt;
                next();
            })
            .catch((err) => {
                res.status(401).send(err.message);
            });
    }

}

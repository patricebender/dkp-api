import PlayerController from "../src/controllers/PlayerController";
import OktaJwtVerifier from "@okta/jwt-verifier";
import Player from "../src/models/Player";
import RaidController from "../src/controllers/RaidController";

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-181790.okta.com/oauth2/default',
    clientId: '0oa2gduj6gvLnlHpd4x6',
    assertClaims: {
        aud: 'api://default',
    },
});


export default (server) => {
    // player
    server.get('/player:mail', authenticationRequired, PlayerController.get);
    server.post('/player', authenticationRequired, PlayerController.insert);

    // raids
    server.get('/raids', authenticationRequired, RaidController.getAll);


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

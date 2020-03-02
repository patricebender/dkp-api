import Service from './Service';
import PlayerService from "./PlayerService";

class RaidService extends Service {
    constructor(model) {
        super(model);
    }

    async insert(data) {
        return super.insert(data);
    }

    async registerForRaid(player, raid, registrationType) {
        try {
            const raidLookup = await this.get(raid._id);

            if (raidLookup.item) {
                const raid = raidLookup.item;
                const registrationDate = new Date();
                const registration = {registrationDate, player};

                const alreadyRegisteredFor = this.isPlayerRegistered(raid, player);
                if (alreadyRegisteredFor){
                    console.log("Player already in " + alreadyRegisteredFor);
                    raid[alreadyRegisteredFor] = raid[alreadyRegisteredFor].filter(reg => {
                       return reg.player.mail !== player.mail;
                    });
                }
                raid[registrationType].push(registration);
                console.log("Yeah registration eingefügt");

                return this.update(raid._id, raid);
            }
            return {
                error: true,
                statusCode: 404,
                errorMessage: "raid not found"
            };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                statusCode: 500,
            };
        }
    }

    isPlayerRegistered(raid, player) {
        console.log(raid, player);
        return raid.bench.some(reg => reg.player.mail === player.mail) ? 'bench' :
            raid.confirm.some(reg => reg.player.mail === player.mail) ? 'confirm' :
                raid.late.some(reg => reg.player.mail === player.mail) ? 'late' :
                    raid.decline.some(reg => reg.player.mail === player.mail) ? 'decline' : '';
    }
}

export default RaidService;

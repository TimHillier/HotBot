// Just returns the bottom score. 
const initModels = require("../tables/init-models");
const Sequelize = require('sequelize');

var host = process.env.DB_HOST.trim();
const sequelize = new Sequelize(process.env.DB_NAME.trim(), process.env.DB_USER.trim(), process.env.DB_PASS.trim(), {
    host: host,
    dialect: 'sqlite',
    logging : false,
    storage: 'database.sqlite',
});


const model = initModels(sequelize);

module.exports = function (msg, args) {
getBottom(msg);
}


/**
    Return The Bottom.
**/
async function getBottom(msg) {
    const users = await model.scores.findAll({ limit: 1, attributes: ['score', 'user_id'], order:[['score', 'ASC']] });
    let place = 'Last: ';
    let leaderboard = '';
    
    for (const user of users) {
        let user_name = await global.client.users.fetch(user.user_id);
        leaderboard += place + "" + user_name.username + ": " + user.score + "\n"; 
        place++;
    }
    msg.reply(leaderboard);

}

async function getName(user_id) {
    return await global.client.users.fetch(user_id);

}

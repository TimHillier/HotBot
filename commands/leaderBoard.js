// Just returns the top ten or so scores.  
const initModels = require("../tables/init-models");
const Sequelize = require('sequelize');
//const { client } = require('../hotbot.js');

var host = process.env.DB_HOST.trim();
const sequelize = new Sequelize(process.env.DB_NAME.trim(), process.env.DB_USER.trim(), process.env.DB_PASS.trim(), {
    host: host,
    dialect: 'sqlite',
    logging : false,
    storage: 'database.sqlite',
});


const model = initModels(sequelize);

module.exports = function (msg, args) {
getLeader(msg);
}


/**
    Return The Top Leaders.
**/
async function getLeader(msg) {
    const users = await model.scores.findAll({ limit: 10, attributes: ['score', 'user_id'], order:[['score', 'DESC']] });
    let place = 1;
    let leaderboard = '';
    
    for (const user of users) {
        let user_name = await global.client.users.fetch(user.user_id);
        leaderboard += place + ". " + user_name.username + ": " + user.score + "\n"; 
        place++;
    }
    msg.reply(leaderboard);

}

async function getName(user_id) {
    //console.log(global.client.users.fetch(user_id));
    return await global.client.users.fetch(user_id);

}

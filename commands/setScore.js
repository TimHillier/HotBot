// This should just return the users score. 
// When a message get's reacted :p2: :m2: the user who messaged get's a +2 or -2. 
// We all start at 0 and go from there. 
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
if (msg.author.id === process.env.TIMID.trim()) {
    setScore(msg);
}
else {
    msg.reply("no");
}

return;

}

/**
    Return The Score of the user. 
**/
async function setScore(msg) {
    mention = msg.content.split(" ")[1];
    new_score = msg.content.split(" ")[2];
    if (mention != undefined || new_score != undefined) {
        mentioned_user_id = mention.substring(3, mention.length - 1);
        const user = await model.scores.update({score: new_score}, { where: { user_id: mentioned_user_id } });
    }
    return;

}

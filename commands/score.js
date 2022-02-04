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
    score = getScore(msg);
    score.then(function(current_score) {
    msg.reply('Score: ' + current_score);
    });

return;

}

/**
    Return The Score of the user. 
**/
async function getScore(msg) {
    mention = msg.content.split(" ")[1];
    if (mention != undefined) {
        mentioned_user_id = mention.substring(3, mention.length - 1);
        const user = await model.scores.findOne({ where: { user_id: mentioned_user_id } });
        if (user) {
            score = user.get("score");
            return score;
        }
        return -1;
    }

}

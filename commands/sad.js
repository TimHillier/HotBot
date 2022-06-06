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
sad(msg);
}


/**
    Return The Bottom.
**/
async function sad(msg) {
    msg.reply(':sob:');

}


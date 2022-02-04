var DataTypes = require("sequelize").DataTypes;
var _scores = require("./scores");

function initModels(sequelize) {
  var scores = _scores(sequelize, DataTypes);


  return {
    scores,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

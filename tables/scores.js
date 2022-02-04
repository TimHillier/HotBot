const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scores', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'scores',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_scores_1",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

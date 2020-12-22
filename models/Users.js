const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    Tel: { type: DataTypes.INTEGER },
  });

  Users.prototype.dateFormat = (data) => moment(data).format("YYYY-MM-DD");

  return Users;
};

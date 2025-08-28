const Sequelize = require("sequelize");
const database = new Sequelize("bloggingplatform", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = database;

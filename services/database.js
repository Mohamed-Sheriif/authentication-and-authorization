const Database = require("nedb-promises");

const users = Database.create("./users.db");

module.exports = { users };

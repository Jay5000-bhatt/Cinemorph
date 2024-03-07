const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://Jay_Bhatt2201:R6BZ5BkOH5qz1rMl@server.tratjqt.mongodb.net/`;

const dbName = "Cinemorph";

const connect = mongoose.connect(url + dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connect;

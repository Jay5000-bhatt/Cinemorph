const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://bhattjay114:BpeQMDOzAAFvy35b@cluster0.omq0soh.mongodb.net/`;

const dbName = "Netflix";

const connect = mongoose.connect(url + dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connect;

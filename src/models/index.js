const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

// add your model here:
db.post = require("./post.model")(mongoose);
db.user = require("./user.model")(mongoose);
db.role = require("./role.model")(mongoose);
db.category = require("./category.model")(mongoose);

// declared roles
db.ROLES = ["superuser", "user"];

module.exports = db;

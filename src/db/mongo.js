const db = require("../models");
const Role = db.role;
const Category = db.category;

const startMongo = db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("⚡️[server]: Connected to the database!");
    initial();
  })
  .catch((err) => {
    console.log("⚡️[server]: Cannot connect to the database!", err);
    process.exit();
  });

function initial() {
  //initial data
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "superuser",
      }).save((err) => {
        if (err) {
          console.log("⚡️[mongo]: error", err);
        }

        console.log("⚡️[mongo]: added 'superuser' to roles collection");
      });

      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("⚡️[mongo]: error", err);
        }

        console.log("⚡️[mongo]: added 'user' to roles collection");
      });
    }
  });
  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const uncategorized = "Uncategorized";
      new Category({
        slug: uncategorized.replace(/\s+/g, "-").toLowerCase(),
        name: uncategorized,
      }).save((err) => {
        if (err) {
          console.log("⚡️[mongo]: error", err);
        }
        console.log(
          "⚡️[mongo]: added 'Uncategorized' to categories collection"
        );
      });
    }
  });
}

module.exports = startMongo;

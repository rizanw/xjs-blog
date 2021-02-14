const controller = require("../controllers/category.controller");
const { authJwt } = require("../middlewares");
require("dotenv").config();
const config = require("../config");

const apiUri = config.api.uri;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(`${apiUri}/categories`, controller.getAll);
  app.post(`${apiUri}/category`, [authJwt.verifyToken], controller.create);
  app.delete(
    `${apiUri}/category/:id`,
    [authJwt.verifyToken],
    controller.delete
  );
};

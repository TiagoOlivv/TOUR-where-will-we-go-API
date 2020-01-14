const { Router } = require("express");

const LocalController = require("./controllers/LocalCotroller");
const SearchCotroller = require("./controllers/SearchController");

const routes = Router();

routes.get("/locals", LocalController.index);
routes.post("/locals", LocalController.store);

routes.get("/search", SearchCotroller.index);

module.exports = routes;

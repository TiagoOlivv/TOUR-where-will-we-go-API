const { Router } = require("express");

const LocalController = require("./controllers/LocalCotroller");
const SearchCotroller = require("./controllers/SearchController");

const routes = Router();

routes.get("/locals", LocalController.index);
routes.post("/locals", LocalController.store);
routes.delete("/locals/:_id/remove", LocalController.destroy);
routes.put("/locals/:_id/update", LocalController.update);

routes.get("/search", SearchCotroller.index);

module.exports = routes;

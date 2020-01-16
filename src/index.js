const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

mongoose.connect(
	"mongodb+srv://user:pass@cluster0-tesgy.mongodb.net/week10?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(express.json());
app.use(routes);

// Query Params: request.query (filtros, ordenação, paginação)
// Route Params: request.params (identificar um recurso na alteração ou remoção)
// Body: request.body (dados para criação ou alteração de um registro)

app.listen(3333);

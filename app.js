"use strict";

const SwaggerExpress = require("swagger-express-mw");
const express = require("express");
const path = require("path");
const cors = require("./api/config/cors.config");
const router = require("./api/routes/routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//Express config

const app = express();
app.use(morgan("dev"));
app.use(cors);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

const config = {
	appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
	if (err) {
		throw err;
	}

	// install middleware
	swaggerExpress.register(app);

	// Server launcher

	const port = process.env.PORT || 10010;
	app.listen(port, () => console.log(`App listening on port ${port}`));

	// Console greeting

	if (swaggerExpress.runner.swagger.paths["/hello"]) {
		console.log(
			"try this:\ncurl http://127.0.0.1:" + port + "/hello?name=Scott"
		);
	}
});

module.exports = app; // for testing

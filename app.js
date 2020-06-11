"use strict";

const SwaggerExpress = require("swagger-express-mw");
const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./api/routes/routes");

app.use(morgan("tiny"));
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
	app.listen(port);

	// Console greeting

	if (swaggerExpress.runner.swagger.paths["/hello"]) {
		console.log(
			"try this:\ncurl http://127.0.0.1:" + port + "/hello?name=Scott"
		);
	}
});

module.exports = app; // for testing

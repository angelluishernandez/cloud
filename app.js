"use strict";
require("dotenv").config();

const SwaggerExpress = require("swagger-express-mw");
const express = require("express");
const path = require("path");
const cors = require("./api/config/cors.config");
const router = require("./api/routes/routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

// DB Config

if (process.env.NODE_ENV !== "test") {
	require("./api/config/db.config");
}

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

// error handler
app.use(function (error, req, res, next) {
	console.error(error);

	res.status(error.status || 500);

	const data = {};

	if (error instanceof mongoose.Error.ValidationError) {
		res.status(400);
		for (field of Object.keys(error.errors)) {
			error.errors[field] = error.errors[field].message;
		}
		data.errors = error.errors;
	} else if (error instanceof mongoose.Error.CastError) {
		error = createError(404, "Resource not found");
	}

	data.message = error.message;
	res.json(data);
});

// Swagger config

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

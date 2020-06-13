"use strict";

const helpers = require("../helpers/helper");
const User = require("../models/user.model");

// This function has been made with the sole purpouse to test that the API is working

module.exports.greeting = (req, res, next) => {
	res.status(200).send({
		greeting: "Hello, the API is working",
	});
};

////////////////////////////////////////////
//GET USERS
////////////////////////////////////////////

module.exports.getAllUsers = (req, res, next) => {
	User.find().then((users) => {
		if (users) {
			res.status(200).send(users);
		} else {
			res.status(202).send("No users found");
		}
	});
};

////////////////////////////////////////////
//CREATE ONE USER
////////////////////////////////////////////

module.exports.createUser = (req, res, next) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		birthDate: req.body.birthDate,
		address: {
			street: req.body.street,
			state: req.body.state,
			city: req.body.city,
			country: req.body.country,
			zip: req.body.zip,
		},
	});

	user
		.save()
		.then((user) => res.status(201).send("CREATED"))
		.catch((error) => res.status(405).send(error));
};

////////////////////////////////////////////
//GET ONE USER
////////////////////////////////////////////

module.exports.getOneUser = (req, res, next) => {
	const userId = req.params.userId;

	// if (isNaN(userId)) {
	// 	res.status(400).send("Invalid id");
	// }

	User.findById(userId)
		.then((user) => {
			if (user) {
				res.status(200).send(user);
			}
			if (!user) {
				res.status(404).send("User not found");
			}
		})
		.catch((error) => console.log(error));
};

////////////////////////////////////////////
//UPDATE USER
////////////////////////////////////////////

module.exports.updateUser = (req, res, next) => {
	const userId = req.params.userId;

	const {
		name,
		email,
		birthDate,
		id,
		street,
		state,
		city,
		country,
		zip,
	} = req.body;
	const userModel = {
		name,
		email,
		birthDate,
		address: {
			id,
			street,
			state,
			city,
			country,
			zip,
		},
	};

	console.log(userModel);

	// if (isNaN(userId)) {
	// 	res.status(400).send("Invalid user id");
	// }

	User.findByIdAndUpdate(userId, userModel, { new: true })
		.then((user) => {
			if (!user) {
				res.status(404).send("User not found");
			} else {
				res.status(200).send("OK");
			}
		})
		.catch((error) => console.error(error));
};

////////////////////////////////////////////
//DELETE USER
////////////////////////////////////////////

module.exports.deleteUser = (req, res, next) => {
	const userId = req.params.userId;

	// if (isNaN(userId)) {
	// 	res.status(400).send("Invalid user id");
	// }

	User.findByIdAndDelete(userId)
		.then((user) => {
			if (!user) {
				res.status(404).send("User not found");
			} else {
				res.status(202).send("OK");
			}
		})
		.catch((error) => console.error(error));
};

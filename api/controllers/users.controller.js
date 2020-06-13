"use strict";

const helpers = require("../helpers/helper");
const User = require("../models/user.model");

// This function has been made with the sole purpouse to test that the API is working

module.exports.greeting = (req, res, next) => {
	res.status(200).json("Hello, the API is working");
};

////////////////////////////////////////////
//GET USERS
////////////////////////////////////////////

module.exports.getAllUsers = (req, res, next) => {
	User.find().then((users) => {
		if (users.length >= 1) {
			res.status(200).json(users);
		} else {
			res.status(202).json("No users found");
		}
	});
};

////////////////////////////////////////////
//CREATE ONE USER
////////////////////////////////////////////

module.exports.createUser = (req, res, next) => {
	let userCount = 0;

	User.find()
		.then((users) => {
			userCount = users.length;

			///
			console.log(userCount);

			const user = new User({
				_id: userCount + 1,
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

			if (!user.name || !user.email) {
				res.status(405).json("Invalid input");
			}
			user
				.save()
				.then((user) => res.status(201).json("CREATED"))
				.catch((err) => console.log(err));
		})
		.catch((error) => console.log(error));
};
////////////////////////////////////////////
//GET ONE USER
////////////////////////////////////////////

module.exports.getOneUser = (req, res, next) => {
	const userId = Number(req.params.userId);

	if (isNaN(userId)) {
		res.status(400).json("Invalid id");
	}

	User.findById(userId)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			}
			if (!user) {
				res.status(404).json("User not found");
			}
		})
		.catch((error) => console.log(error));
};

////////////////////////////////////////////
//UPDATE USER
////////////////////////////////////////////

module.exports.updateUser = (req, res, next) => {
	const userId = Number(req.params.userId);

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

	if (isNaN(userId)) {
		res.status(400).json("Invalid user id");
	}

	User.findByIdAndUpdate(userId, userModel, { new: true })
		.then((user) => {
			if (!user) {
				res.status(404).json("User not found");
			} else {
				res.status(200).json("OK");
			}
		})
		.catch((error) => console.error(error));
};

////////////////////////////////////////////
//DELETE USER
////////////////////////////////////////////

module.exports.deleteUser = (req, res, next) => {
	const userId = Number(req.params.userId);

	if (isNaN(userId)) {
		res.status(400).json("Invalid user id");
	}

	User.findByIdAndDelete(userId)
		.then((user) => {
			if (!user) {
				res.status(404).json("User not found");
			} else {
				res.status(202).json("OK");
			}
		})
		.catch((error) => console.error(error));
};

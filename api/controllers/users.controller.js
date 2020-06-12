"use strict";

const fs = require("fs");
const path = require("path");

const helpers = require("../helpers/helper");
const filePath = path.resolve(__dirname, "../data/users.json");

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
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		res.status(200).send(JSON.parse(data));
	});
};

////////////////////////////////////////////
//CREATE ONE USER
////////////////////////////////////////////

module.exports.createUser = (req, res, next) => {
	const userData = req.body;

	let users = helpers.JSONtoArray(filePath);

	const userObj = {
		id: users.length + 1,
		...userData,
	};

	// userExists returns true if the user exists. False otherwise

	const userExists = helpers.userExists(users, userData.email);

	let newUsersFile = [...users, userObj];

	if (!userData.email || !userData.name) {
		res.status(404).send("invalid input");
	} else if (userExists) {
		res.status(404).send("User already exists");
	} else {
		fs.writeFile(filePath, JSON.stringify(newUsersFile), "utf8", (err) => {
			if (err) {
				console.log(err);
			}
			res.status(201).send("CREATED");
		});
	}
};

////////////////////////////////////////////
//GET ONE USER
////////////////////////////////////////////

module.exports.getOneUser = (req, res, next) => {
	const userId = Number(req.params.userId);

	let users = helpers.JSONtoArray(filePath);

	const user = users.find((user) => user.id === userId);

	if (user) {
		res.status(200).send(user);
	} else if (isNaN(userId)) {
		res.status(400).send("Invalid user id");
	} else if (users.length !== 0 && !user) {
		res.status(404).send("User not found");
	}
};

////////////////////////////////////////////
//UPDATE USER
////////////////////////////////////////////

module.exports.updateUser = (req, res, next) => {
	const newUserData = req.body;
	const userId = Number(req.params.userId);
	let users = helpers.JSONtoArray(filePath);

	const userToUpdate = users.find((user) => user.id === userId);
	const indexOfUser = users.indexOf(userToUpdate);

	const newUserObj = {
		id: req.params.id,
		...newUserData,
	};

	if (indexOfUser > 1) {
		const newUsersArr = users.splice(indexOfUser, 1, newUserObj);
		fs.writeFile(filePath, JSON.stringify(newUsersArr), "utf8", (err, data) => {
			if (err) {
				console.log(err);
			}
			console.log(data);
			res.status(200).send("OK");
		});
	} else if (isNaN(userId)) {
		res.status(400).send("Invalid user id");
	} else if (users.length !== 0 && !userToUpdate) {
		res.status(404).send("User not found");
	}
};

////////////////////////////////////////////
//DELETE USER
////////////////////////////////////////////

module.exports.deleteUser = (req, res, next) => {
	const userId = Number(req.params.userId);
	const users = helpers.JSONtoArray(filePath);

	// Return all elements in the array but the one we are looking for

	const filteredUsers = users.filter((user) => user.id !== userId);

	// If users.length and filteredUsers.length are equal this means that the user exists
	// and we can procede to its deletion. Else there's no such element in the file.

	if (users.length !== filteredUsers.length) {
		fs.writeFile(
			filePath,
			JSON.stringify(filteredUsers),
			"utf8",
			(err, data) => {
				if (err) {
					console.log(err);
				}
				res.status(202).json("OK");
			}
		);
		res.status(200).json("OK");
	}
	// If the id in params cannot be parsed into a number we cannot proceed.
	else if (isNaN(userId)) {
		res.status(400).json("Invalid user id");
	}

	// If the length is the same that means that the user hasn't been found.
	else if (users.length === filteredUsers.length) {
		res.status(404).json("User not found");
	}
};

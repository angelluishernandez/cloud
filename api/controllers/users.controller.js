"use strict";

let users = [
	{
		id: 1,
		name: "Angel",
		birthdate: "26121987",
		address: {
			id: 1,
			street: "Some street",
			state: "Some state",
			city: "Some city",
			country: "Some country",
			zip: "45AB",
		},
	},

	{
		id: 2,
		name: "Luis",
		birthdate: "26121987",
		address: {
			id: 2,
			street: "Some street",
			state: "Some state",
			city: "Some city",
			country: "Some country",
			zip: "45AB",
		},
	},
];

module.exports.greeting = (req, res, next) => {
	res.json({
		greeting: "hello",
	});
};

module.exports.getAllUsers = (req, res, next) => {
	res.send(users);
};

module.exports.createUser = (req, res, next) => {
	const user = req.body;
	users.push(user);
	res.json(users);
};

module.exports.getOneUser = (req, res, next) => {
	const userId = req.params.userId;

	const user = users.filter((user) => user.id === userId);

	if (user) {
		res.status(200).json(user);
	} else if (users.length !== 0 && !user) {
		res.status(400).json("Invalid user id");
	} else if (!user) {
		res.status(404).json("User not found");
	}
};

module.exports.updateUser = (req, res, next) => {
	const updatedUser = req.body;
	const userId = req.params.userId;
	const userToUpdate = users.filter((user) => user.id === userId);

	// Compare current object with the user send in the body of the request.
	// In case a property  in userToUpdate is equal to the one in the body don't change anything
	// If they are not equal overwrite it with the new data.
};

module.exports.deleteUser = (req, res, next) => {
	const userId = req.params.userId;
	const user = users.filter((user) => user.id === userId);

	if (user) {
		const userIndex = users.indexOf(user);
		users.splice(userIndex, 1);
		res.status(200).json("OK");
	} else if (users.length !== 0 && !user) {
		res.status(400).json("Invalid user id");
	} else if (!user) {
		res.status(404).json("User not found");
	}
};

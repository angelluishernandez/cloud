const fs = require("fs");

const writeJSONFile = (filename, content) => {
	fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
		if (err) {
			console.log(err);
		}
	});
};

// Check if user already exists

const userExists = (usersArr, userEmail) => {
	console.log("----------------------");
	console.log(userEmail);

	const existingUsers = usersArr.filter((user) => user.email === userEmail);
	const isUserPresent = existingUsers.length >= 1 ? true : false;

	return isUserPresent;
};

//Convert JSON file into an array

const JSONtoArray = (JSONFile) => {
	let array = JSON.parse(fs.readFileSync(JSONFile, "utf8"));
	return array;
};

module.exports = {
	writeJSONFile,
	userExists,
	JSONtoArray,
};

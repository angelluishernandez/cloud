const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: [true, "Your name is required"],
	},
	email: {
		type: String,
		required: [true, "Your email is required"],
		trim: true,
		lowercase: true,
		match: [EMAIL_PATTERN, "Your email is required"],
		unique: true,
	},
	birthDate: {
		type: Date,
	},
	address: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			required: true,
			auto: true,
		},
		street: {
			type: String,
			required: true,
		},
		state: String,
		city: String,
		zip: {
			type: String,
			required: true,
		},
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;

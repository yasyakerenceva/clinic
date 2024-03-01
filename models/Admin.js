const mongoose = require("mongoose");
const validator = require("validator");

const AdminSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "Invalid email",
		},
	},
	password: {
		type: String,
		required: true,
	},
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;

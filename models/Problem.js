const mongoose = require("mongoose");

const ProblemSchema = mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	text: {
		type: String,
	},
	dateTime: {
		type: String,
	},
});

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;

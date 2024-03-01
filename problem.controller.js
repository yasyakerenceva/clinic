const Problem = require("./models/Problem");

async function addProblem(fullname, phone, text, dateTime) {
	await Problem.create({ fullname, phone, text, dateTime });
}

async function getProblems() {
	return await Problem.find();
}

module.exports = {
	addProblem,
	getProblems,
};

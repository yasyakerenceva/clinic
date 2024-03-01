const Admin = require("./models/Admin");

async function loginAdmin(email, password) {
	const admin = await Admin.findOne({ email });

	if (!admin) {
		throw new Error("Админ не найден. Обратитесь к руководству.");
	}

	const isPasswordCorrect = password === admin.password;

	if (!isPasswordCorrect) {
		throw new Error("Неправильный пароль");
	}

	return email;
}

module.exports = { loginAdmin };

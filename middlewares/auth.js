function auth(req, res, next) {
	const token = req.cookies.token;

	if (token) {
		req.user = {
			email: token,
		};

		next();
	} else {
		res.redirect("/appointment");
	}
}

module.exports = auth;

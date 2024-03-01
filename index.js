const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { addProblem, getProblems } = require("./problem.controller");
const { loginAdmin } = require("./admin.controller");
const auth = require("./middlewares/auth");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/appointment", async (req, res) => {
	res.render("appointment", {
		title: "Express App",
		error: undefined,
		success: undefined,
	});
});

app.get("/login", async (req, res) => {
	res.render("login", {
		title: "Express App",
		error: undefined,
	});
});

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const token = await loginAdmin(email, password);

		res.cookie("token", token, { httpOnly: true });

		res.redirect("/");
	} catch (e) {
		res.render("login", {
			title: "Express App",
			error: e.message,
		});
	}
});

app.post("/appointment", async (req, res) => {
	try {
		const { fullname, phone, text } = req.body;
		const dateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
		await addProblem(fullname, phone, text, dateTime);
		res.render("appointment", {
			title: "Express App",
			success: true,
			error: false,
		});
	} catch (e) {
		res.render("appointment", {
			title: "Express App",
			success: false,
			error: e.message,
		});
	}
});

app.get("/logout", (req, res) => {
	res.cookie("token", "", { httpOnly: true });
	res.redirect("/login");
});

app.use(auth);

app.get("/", async (req, res) => {
	res.render("index", {
		title: "Express App",
		problems: await getProblems(),
		error: false,
	});
});

mongoose
	.connect(
		"mongodb+srv://test:qwe2qwe2@cluster0.ladeaf1.mongodb.net/problems?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				chalk.green(`Server has been started on port ${PORT}...`)
			);
		});
	});

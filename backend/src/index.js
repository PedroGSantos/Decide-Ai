const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
});

const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
	console.log("ola mundo");
});

app.get("/users", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM users");
		return res.status(200).send(rows);
	} catch (err) {
		return res.status(400).send(err);
	}
});

app.post("/new_user", async (req, res) => {
	const { email, password, watchedMovies } = req.body;
	const movies = watchedMovies != null ? watchedMovies : [];
	try {
		const user = await pool.query(
			"SELECT * FROM users WHERE email = ($1)",
			[email]
		);
		if (!user.rows[0]) {
			user = await pool.query(
				"INSERT INTO users(email, password, watchedMovies) VALUES ($1, $2, $3) RETURNING *",
				[email, password, movies]
			);
		}
		return res.status(200).send(user.rows);
	} catch (err) {
		return res.status(400).send(err);
	}
});

app.put("/users/:userId/movies", async (req, res) => {
	const userId = req.params.userId;
	const { title, id } = req.body;
	try {
		const result = await pool.query(
			"SELECT * FROM users WHERE user_id = $1",
			[userId]
		);
		const user = result.rows[0];

		if (!user.watchedmovies) {
			user.watchedmovies = [];
		}

		for (let movie of user.watchedmovies) {
			console.log(id, movie);
			if (movie.id == id) {
				return res.status(203).send("Movie already watched");
			}
		}
		user.watchedmovies.push({ title, id });
		await pool.query(
			"UPDATE users SET watchedMovies = $1 WHERE user_id = $2",
			[user.watchedmovies, userId]
		);

		res.send(user);
	} catch (err) {
		return res.status(400).send(err);
	}
});

app.put("/users/:userId/movies_list", async (req, res) => {
	const userId = req.params.userId;
	const listMovies = req.body;
	try {
		const result = await pool.query(
			"SELECT * FROM users WHERE user_id = $1",
			[userId]
		);
		const user = result.rows[0];

		if (!user.watchedmovies) {
			user.watchedmovies = [];
		}

		for (let content of listMovies) {
			let watchedContent = false;
			for (let movie of user.watchedmovies) {
				console.log(content.id, movie);
				if (movie.id == content.id) {
					watchedContent = true;
				}
			}
			if (!watchedContent) {
				user.watchedmovies.push(content);
			}
		}
		await pool.query(
			"UPDATE users SET watchedMovies = $1 WHERE user_id = $2",
			[user.watchedmovies, userId]
		);

		res.send(user);
	} catch (err) {
		return res.status(400).send(err);
	}
});

app.delete("/users/:userId/movies/:movieId", async (req, res) => {
	const userId = req.params.userId;
	const movieId = req.params.movieId;
	try {
		const result = await pool.query(
			"SELECT * FROM users WHERE user_id = $1",
			[userId]
		);
		const user = result.rows[0];

		if (!user.watchedmovies) {
			user.watchedmovies = [];
		}

		user.watchedmovies = user.watchedmovies.filter(
			(movie) => movie.id != movieId
		);

		await pool.query(
			"UPDATE users SET watchedMovies = $1 WHERE user_id = $2",
			[user.watchedmovies, userId]
		);

		res.send(user);
	} catch (err) {
		return res.status(400).send(err);
	}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import React, { useState, useEffect } from "react";
import FilmCard from "../../components/filmCard";
import Menu from "../../components/menu";
import "../../index.css";

const omdbApiKey = "ba12fd4f";

export function FilmesAssistidos() {
	const [watchedMovies, setWatchedMovies] = useState([]);
	const [inputMovie, setInputMovie] = useState("");
	const [notFound, setnotFound] = useState("");
	const email = localStorage.getItem("email");
	const id = localStorage.getItem("id");

	async function getWatchedMovies() {
		console.log(id, email, "test");
		const url = `/api/users`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const user = data.find((user) => user.email === email);

				if (user && user.watchedmovies) {
					const promises = user.watchedmovies.map((movie) => {
						const apiUrl = `http://www.omdbapi.com/?i=${movie.id}&apikey=${omdbApiKey}`;
						return fetch(apiUrl).then((response) =>
							response.json()
						);
					});
					const moviesData = Promise.all(promises);
					moviesData.then((response) => {
						setWatchedMovies(response);
					});
				}
			})
			.catch((error) => console.error(error));
	}

	useEffect(() => {
		getWatchedMovies();
	}, [email]);

	function addMovie() {
		fetch(
			`http://www.omdbapi.com/?t=` + inputMovie + `&apikey=` + omdbApiKey
		)
			.then((response) => response.json())
			.then((movieData) => {
				if (movieData.Response != "False") {
					console.log(movieData);
					updateMovie(movieData);
					setnotFound("");
					setInputMovie("");
				} else {
					setnotFound("Filme não encontrado, tente novamente.");
				}
			});
	}

	async function updateMovie(movie) {
		const url = `/api/users`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const user = data.find((user) => user.email === email);

				const apiUrl = `/api/users/${user.user_id}/movies`;
				fetch(apiUrl, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: movie.Title,
						id: movie.imdbID,
					}),
				}).then(() => {
					getWatchedMovies();
				});
			})
			.catch((error) => console.error(error));
	}

	function removeMovie(movie) {
		const url = `/api/users`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const user = data.find((user) => user.email === email);

				const apiUrl = `/api/users/${user.user_id}/movies/${movie.imdbID}`;
				fetch(apiUrl, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}).then(() => {
					getWatchedMovies();
				});
			})
			.catch((error) => console.error(error));
	}

	return (
		<div>
			<Menu />
			<div className="flex justify-center items-center my-8">
				<div className="w-3/4">
					<div className="text-left mb-4">
						<label className="block text-xl mb-2" htmlFor="grid">
							Adicionar fílmes já assistidos:
						</label>
					</div>

					<div className="flex items-center w-full space-x-4">
						<input
							type="text"
							value={inputMovie}
							id="watched-movie-input"
							placeholder="Nome do filme"
							className="text-black py-2 rounded-md w-3/5 md:w-8/12 h-4/5 pl-2"
							onChange={(event) => {
								setInputMovie(event.target.value);
							}}
						/>
						<button
							className="bg-red-500 hover:bg-red-700 active:bg-red-400 md:text-xl text-base text-white px-4 py-2 rounded-lg w-2/5 md:w-4/12"
							onClick={addMovie}
						>
							Adicionar
						</button>
					</div>

					<p className="text-red-500">{notFound}</p>

					<div className="text-left mb-4 mt-8">
						<label className="block text-xl mb-2" htmlFor="grid">
							Filmes assistidos:
						</label>
					</div>

					<div id="watchedMoviesList" className="flex flex-wrap">
						{watchedMovies.map((movie) => {
							return (
								<FilmCard
									removeClick={() => {
										removeMovie(movie);
									}}
									data={{
										id: movie.imdbID,
										title: movie.Title,
										image: movie.Poster,
									}}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

import React, { useState, useEffect } from "react";
import Menu from "../../components/menu";
import "../../index.css";

const omdbApiKey = "ba12fd4f";

export function FilmesAssistidos() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const email = "italo@gmail.com";

  useEffect(() => {
    async function getWatchedMovies() {
      const response = await fetch("http://localhost:3333/users");
      const { users } = await response.json();
      const user = users.find((user) => user.email === email);

      if (user && user.watchedMovies) {
        const promises = user.watchedMovies.map((movie) => {
          const apiUrl = `http://www.omdbapi.com/?i=${movie.id}&apikey=${omdbApiKey}`;
          return fetch(apiUrl).then((response) => response.json());
        });

        const moviesData = await Promise.all(promises);
        setWatchedMovies(moviesData);
      }
    }

    getWatchedMovies();
  }, [email]);

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
              id="watched-movie-input"
              placeholder=" Nome do filme"
              className="text-black py-2 rounded-md w-3/5 md:w-8/12 h-4/5"
            />
            <button className="bg-red-500 hover:bg-red-700 active:bg-red-400 md:text-xl text-base text-white px-4 py-2 rounded-lg w-2/5 md:w-4/12">
              Adicionar
            </button>
          </div>

          <div className="text-left mb-4 mt-8">
            <label className="block text-xl mb-2" htmlFor="grid">
              Filmes assistidos:
            </label>
          </div>

          <div id="watchedMoviesList" className="flex flex-wrap">
            {watchedMovies.map((movie) => (
              <div
                key={movie.imdbID}
                className="md:w-1/4 md:p-4 sm:w-1/2 sm:p-2 w-full"
              >
                <div className="image-wrapper">
                  <a href="../DetalheFilme/index.html">
                    <img
                      className="w-full"
                      src={movie.Poster}
                      alt={movie.Title}
                    />
                    <div className="gradient-overlay"></div>
                  </a>
                  <button className="image-button">
                    <i className="fa-solid fa-lg fa-circle-xmark"></i>
                  </button>
                </div>
                <p className="text-center text-lg"> {movie.Title} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

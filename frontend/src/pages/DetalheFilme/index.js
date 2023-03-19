import React, { useState, useEffect } from "react";
import Menu from "../../components/menu";
import './style.css'

export function DetalheFilme() {

	const [detailMovie, setDetailMovie] = useState([]);
	const api_key = "k_6ngqf1cb"
	const id_film = "tt0298148"

	async function getDetailMovie() {
		const url = `https://imdb-api.com/pt/API/Title/${api_key}/${id_film}/FullActor,Posters,Wikipedia`;
	
		// Make a request to the API to retrieve the list of users
		fetch(url)
		  .then(response => response.json())
		  .then(data => {
			console.log('teste')
			console.log(data)
			setDetailMovie(data);
		  })
		  .catch(error => console.error(error));
	  }

	useEffect(() => {
		getDetailMovie();
	}, [id_film]);

	//getDetailMovie()

	return (
		<div>
			<Menu />
			<div className="row">
				<div className="contentFilm">
					<h1>{detailMovie.title}</h1>
					<p>{detailMovie.plotLocal}</p>
					<br></br>
					<p>Ano de lançamento: {detailMovie.year}</p>
					<p>Elenco: {detailMovie.stars}</p>
					<p>Gêneros: {detailMovie.genres}</p>
				</div>

				<div className="posterFilm">
					<img className="filmImage" id="filmImage" src={detailMovie.posters.posters[0].link} alt=""></img>
				</div>
			</div>
		</div>


	
	)

}

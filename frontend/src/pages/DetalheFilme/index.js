import React, { useState, useEffect } from "react";
import Menu from "../../components/menu";
import { useParams } from "react-router";
import './style.css'

export function DetalheFilme(props) {

	const [detailMovie, setDetailMovie] = useState([]);
	//const api_key = "k_s7ar6knl";
	const api_key = process.env.REACT_APP_API_KEY;
	const { id } = useParams();
	const id_film = id;

	async function getDetailMovie() {
		const url = `https://imdb-api.com/pt/API/Title/${api_key}/${id_film}/FullActor,Posters,Wikipedia`;
		console.log(api_key)
		console.log(id_film);
	
		await fetch(url)
		  .then(response => response.json())
		  .then(data => {
			console.log(data)
			setDetailMovie(data);
		  })
		  .catch(error => console.error(error));
	  }

	useEffect(() => {
		getDetailMovie();
	}, [id_film]);

	// getDetailMovie()

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
					{detailMovie.posters && <img className="filmImage" id="filmImage" src={detailMovie.posters.posters[0].link} alt=""></img>}
				</div>
			</div>
		</div>
	)

}

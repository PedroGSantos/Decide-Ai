import React, { useState, useEffect } from "react";
import Menu from "../../components/menu";

import "./styles.css";

export function SugerirFilmes() {
	const [dataMovie, setDataMovie] = useState();

	async function getRandomMovie(e) {
		e.preventDefault();

		const apiUrl = `https://imdb-api.com/API/AdvancedSearch/k_s7ar6knl?release_date=${e.target.year.value}-01-01,&genres=${e.target.genre.value}&certificates=us:${e.target.certificates.value}&countries=${e.target.country.value}`;
		console.log(apiUrl);
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.results[0]);
				setDataMovie(data.results[0]);
			});
	}

	return (
		<div id="container">
			<Menu />
			{!dataMovie && (
				<div class="background-image-films">
					<form id="content" onSubmit={getRandomMovie}>
						<p class="bebas-neue text-2xl pq:text-3xl sm:text-4xl mt-7 sm:mt-16 text-center">
							chegou o momento! nOSSo site irá decidir qual filme
							você verá hoje
						</p>
						<div class="flex flex-col">
							<label class="mt-9 pq:text-2xl text-xl">ANO</label>
							<input
								type="number"
								class="inputMovie"
								name="year"
							/>
						</div>
						<div class="flex flex-col">
							<label class="mt-9 pq:text-2xl text-xl">
								GÊNERO
							</label>
							<input
								type="text"
								class="inputMovie"
								name="genre"
							/>
						</div>
						<div class="flex flex-col">
							<label class="mt-9 pq:text-2xl text-xl">PAÍS</label>
							<input
								type="text"
								class="inputMovie"
								name="country"
							/>
						</div>
						<div class="flex flex-col">
							<label class="mt-9 pq:text-2xl text-xl">
								FAIXA ETÁRIA
							</label>
							<input
								type="text"
								class="inputMovie"
								name="certificates"
							/>
						</div>
						<button
							id="buttonMovie"
							class="pq:text-4xl text-lg sm:w-1/3 w-3/4 "
							type="submit"
						>
							DECIDIR
						</button>
					</form>
				</div>
			)}
			{dataMovie && (
				<div id="content2">
					<p class="bebas-neue text-2xl pq:text-3xl sm:text-4xl lg:mt-20 mt-7">
						ESSE É O FILME IDEAL PARA VOCÊ
					</p>
					<a id="buttonCheck" href="../DetalheFilme/index.html">
						<p
							class="bebas-neue  sm:text-2xl text-positive text-start"
							id="textCheck"
						>
							MARCAR COMO ASSISTIDO
						</p>
						<i
							class="fa-sharp fa-solid fa-circle-check color-red text-xl"
							id="iconCheck"
						></i>
					</a>
					<div id="movieContainer">
						<div id="containerImage">
							<img
								src={`${dataMovie.results?.[0].image} `}
								id="imgFilme"
							/>
						</div>
						<div id="infoContainer">
							<div class="box">
								<p class="textBox">2004</p>
							</div>
							<div class="box">
								<p class="textBox">AVENTURA</p>
							</div>
						</div>
						<div id="mainText">
							<p id="titleMovie" class="pq:text-6xl text-xl">
								SHREK 2
							</p>
							<p id="sinopse" class="md:text-base text-xs">
								Shrek e Fiona acabaram de voltar da lua de mel e
								vivem felizes em sua casa no pântano. O casal
								recebe um convite dos pais da princesa, que
								querem conhecer o novo genro, para um jantar no
								castelo. Eles ficaram sabendo que Fiona havia se
								casado com o seu verdadeiro amor, mas o que eles
								ainda não sabem é que este amor é um ogro
								mal-educado de mais de 300 quilos, que conta com
								um burro falante como melhor amigo.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

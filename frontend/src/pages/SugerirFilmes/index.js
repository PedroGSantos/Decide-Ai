import React, { useState, useEffect } from "react";
import Menu from "../../components/menu";

import "./styles.css";

export function SugerirFilmes() {
	const [dataMovie, setDataMovie] = useState();
	const [descriptionAndImage, setDescriptionAndImage] = useState("");
	async function getRandomMovie(e) {
		e.preventDefault();

		const apiUrl = `https://imdb-api.com/API/AdvancedSearch/k_hg4pap4f?release_date=${e.target.year.value}-01-01,&genres=${e.target.genre.value}&certificates=us:${e.target.certificates.value}&countries=${e.target.country.value}`;

		await fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setDataMovie(data.results[0]);
				const id = data.results[0].id;
				const url = `https://imdb-api.com/pt/API/Title/k_12345678/${id}/FullActor,Posters,Wikipedia`;
				fetch(url)
					.then((response) => response.json())
					.then((dataa) => {
						console.log(
							dataa.posters.posters[
								Array(dataa.posters.posters).length
							].link
						);
						setDescriptionAndImage({
							description: dataa.plotLocal,
							image: dataa.posters.posters[
								Array(dataa.posters.posters).length
							].link,
						});
					});
			});
	}

	return (
		<div>
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
							className="pq:text-4xl text-lg sm:w-1/3 w-3/4 bg-red-#FF0707 hover:bg-red-700 active:bg-red-400"
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
					<button id="buttonCheck" onClick={addMovie}>
						<p
							class="bebas-neue sm:text-2xl text-[#26C90B] text-start"
							id="textCheck"
						>
							MARCAR COMO ASSISTIDO
						</p>
						<i
							class="fa-sharp fa-solid fa-circle-check color-red text-xl"
							id="iconCheck"
						></i>
					</button>
					<div
						class="movieContainer"
						style={{
							backgroundImage: `linear-gradient(rgba(1,1,1,0.65), rgba(1,1,1,0.65)), url(${descriptionAndImage.image})`,
							backgroundSize: "100%",
						}}
					>
						<div id="mainText">
							<p
								id="titleMovie"
								class="pq:text-6xl text-xl"
								style={{
									opacity: 1,
								}}
							>
								{dataMovie.title}
							</p>
							<p id="sinopse" class="md:text-base text-xs">
								{descriptionAndImage.description}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

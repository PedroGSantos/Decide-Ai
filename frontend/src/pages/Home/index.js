import React from "react";
import '../../index.css';

export function Home() {
    const url = "http://localhost:3333/users"
    fetch(url)
        .then(response => response.json())
        .then(data => { console.log(data);});

	return (
        <div>
            <div class="background-image-films">
                <div class="flex flex-col my-16 md:ml-32 mx-8 md:w-2/5 p-8">
                    <div class="my-2">
                        <h1 class="bebas-neue md:text-8xl text-6xl text-red-500">
                            DECIDE AÍ
                        </h1>
                    </div>
                    <div class="my-2">
                        <h2 class="bebas-neue md:text-6xl text-4xl font-medium">
                            Tendo dificuldades em decidir o que assistir?
                        </h2>
                    </div>
                    <div class="my-2">
                        <p class="md:text-xl text-base font-lg">
                            Decide aí é sua nova plataforma pare ajudar a decidir o melhor programa para assistir!
                        </p>
                    </div>
                    <div class="my-2">
                        <a href="../login">
                            <button class="bebas-neue w-full bg-red-500 hover:bg-red-700 active:bg-red-400 md:text-4xl text-lg text-white px-4 py-2 rounded-lg">
                                ACESSE AQUI
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
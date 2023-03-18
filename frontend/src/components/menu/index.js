import React from "react";
import './style.css';

function Menu() {
    
    function openMenu() {
        const btn = document.getElementById("menu-btn");
        const nav = document.getElementById("menu");
        const menu = document.getElementById("optionsMenu");
    
        btn.classList.toggle("open");
        nav.classList.toggle("flex");
        nav.classList.toggle("hidden");
        if (menu.style.display == "block") menu.style.display = "none";
        else menu.style.display = "block";
    }


    return (
        <div>
                <nav class="na+vbar relative container mx-auto p-4">
                <div class="flex items-center justify-between">
                    <div class="pt-2 flex space-x-6">
                        <p class="bebas-neue md:text-6xl text-4xl text-red-500">
                            DECIDE AÍ
                        </p>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="/" class="hover:text-red-700"> Filmes Assistidos </a>
                        <a href="/" class="text-red-500 hover:text-red-700"> Sugestão </a>
                        <a href="/" class="hover:text-red-700"><i class="fa-solid fa-right-from-bracket"></i></a>
                    </div>
        
                    <button id="menu-btn" class="block hamburger md:hidden focus:outline-none" onclick={openMenu}>
                        <span class="hamburger-top"></span>
                        <span class="hamburger-middle"></span>
                        <span class="hamburger-bottom"></span>
                    </button>
                </div>
                <div id="optionsMenu">
                    <div id="menu" class="absolute flex-col items-center self-end hidden py-8 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md">
                        <a href="/" class="hover:text-red-700"> Filmes Assistidos </a>
                        <a href="/" class="text-red-500 hover:text-red-700"> Sugestão </a>
                        <a href="/" class="hover:text-red-700">Sair</a>
                    </div>
                </div>
            </nav>
            <hr/>
        </div>
    );
}

export default Menu;
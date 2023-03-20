import React from "react";
import '../../index.css';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';

function FilmCard({ data, removeClick }) {
    const detailsUrl = `/detalheFilme/${data.id}`;

    return(
            <div
                key={data.id}
                className="md:w-1/4 md:p-4 sm:w-1/2 sm:p-2 w-full"
            >
            <div className="image-wrapper">
                <a href={detailsUrl}>
                <img
                    className="w-full"
                    src={data.image}
                    alt={data.title}
                />
                <div className="gradient-overlay"></div>
                </a>
                <button onClick={removeClick} className="image-button">
                    <FontAwesomeIcon icon={faCircleXmark}/> 
                </button>
            </div>
            <p className="text-center text-lg"> {data.title} </p>
            </div>
    );
}

export default FilmCard
"use strict";

document.addEventListener("DOMContentLoaded", initialiser);

function initialiser(evt) {
    const boutonLegende = document.querySelector(".btn");
    boutonLegende.addEventListener("click", interactionLegende);

    const cross = document.querySelector(".cross");
    cross.addEventListener("click", interactionCroix);

    const visualiser = document.querySelector(".intro a");
    visualiser.addEventListener("click", interactionBtnVisualiser);
}

/**
 * Permet de faire apparaître la légende
 * @param {*} evt 
 */
function interactionLegende(evt){
    const legende = document.querySelector(".legende");
    const btn = document.querySelector(".btn");
    legende.classList.toggle("open");
    btn.classList.toggle("grow");
}

/**
 * Permet d'enlever la légende
 * @param {*} evt 
 */
function interactionCroix(evt){
    const cross = document.querySelector(".cross");
    cross.classList.toggle("close");

    const legende = document.querySelector(".legende");
    legende.classList.toggle("open");

    const btn = document.querySelector(".btn");
    btn.classList.toggle("grow");
}


/**
 * Permet de faire apparaitre la dataviz
 * @param {*} evt 
 */
 function interactionBtnVisualiser(evt){
    const titre = document.querySelector(".intro");

    titre.classList.toggle("open");
    setTimeout(() => {
        titre.style.display =" none";
      }, 250);
}

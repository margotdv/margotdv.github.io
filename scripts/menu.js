(function () {

  "use strict";
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    // Gestion du menu mobile
    let btnMenu = document.getElementById("btnMenu");

    btnMenu.addEventListener("click", () => {
      let menu = document.getElementById("menu");
      let btnOuvrir = document.getElementById("ouvrirMenu");
      let btnFermer = document.getElementById("fermerMenu");

      menu.classList.toggle("open");
      btnOuvrir.classList.toggle("invisible");
      btnFermer.classList.toggle("hidden");
    });


    // Afficher les projets au survol de la navbar (version desktop)
    let btnProjets = document.getElementById("btnProjets");
    
    // btnProjets.addEventListener("mouseover", () => {
    //   console.log("ouvrirProjets");
    //   let listeProjets = document.getElementById("listeProjets");
    //   listeProjets.classList.add("projetsOpen");
    // });


    // Mettre en avant les liens du menu en fonction de la page survolée
    const menuLinks = document.querySelectorAll(".menu-link");
    const sections = document.querySelectorAll("section");
    const offset = 300; // Décalage en pixels avant d'appliquer la classe current

    window.addEventListener("scroll", function () {
      let currentSectionId = "";

      // Parcourez les sections pour trouver la section actuellement visible à l'écran
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.id;
        }
      });

      // Met à jour la classe "current" sur les liens du menu
      menuLinks.forEach(function (link) {
        if (link.getAttribute("href").slice(1) === currentSectionId) {
          link.classList.add("current");
        } else {
          link.classList.remove("current");
        }
      });
    });
  }

}());
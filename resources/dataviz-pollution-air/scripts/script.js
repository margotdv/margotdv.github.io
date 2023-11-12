'use strict';

$(document).ready(function () {
    const ANNEE = 2022;

    let positionCalendriers = {"tours" : $("#calendrier-tours").offset(), 
        "blois" : $("#calendrier-blois").offset(), 
        "orleans" : $("#calendrier-orleans").offset()};

    /**
    * Dessiner les calendriers en tenant compte du premier jour et du nombre de jours
    * @param {*} dicoQualite
    * @param {*} dicoTrafic
    * @param {*} ville 
    * @param {*} mois 
    */
    function dessinerCal(dicoQualite, dicoTrafic, ville, mois) {
        let nbJours;
        let premierJour; // Avec lundi = 1 et dimanche = 7

        switch (mois) {
            case "3":
                premierJour = 2;
                nbJours = 31;
                break;
            case "4":
                premierJour = 5;
                nbJours = 30;
                break;
            case "5":
                premierJour = 7;
                nbJours = 31;
                break;
            case "6":
                premierJour = 3;
                nbJours = 30;
                break;
            case "7":
                premierJour = 5;
                nbJours = 31
                break;
            //Correspond à août
            default:
                premierJour = 1;
                nbJours = 31;
                break;
        }

        // Vider la grille
        const grille = $('#grille-' + ville);
        grille.empty();

        // Remplir la grille --> cases transparentes
        for (let i = 1; i < premierJour; i++) {
            grille.append($('<div class="case" style="background-color:transparent"></div>'));
        }

        // Remplir la grille --> cases jours
        for (let i = 1; i <= nbJours; i++) {
            const qualite = dicoQualite[mois + '-' + i];

            const trafic = dicoTrafic[mois + '-' + i];
            if (trafic == 1) {
                grille.append($(`<div id="${mois}-${i}" class="case caseok case${qualite}"></div>`));     // Si le trafic est fluide on ne met pas de bordure
            } else {
                grille.append($(`<div id="${mois}-${i}" class="case caseok case${qualite} trafic trafic-${trafic}"></div>`));       // Sinon on met la bordure correspondante
            }
        }
    }

    /**
     * Formate une clé de date (ex.: 7-3) en chaine de caractères pour l'utilisateur (ex.: 03/07/2022)
     * Utilise la const ANNEE pour l'année (2022)
     * @param {*} cleDate 
     * @return la date formatée
     */
    function formaterCleDate(cleDate) {
        if (!cleDate) {
            return null;
        }
        const composantsDate = cleDate.split('-'); // Normalement : tableau de taille 2
        if (!composantsDate || composantsDate.length !== 2) {
            return null;
        }
        // Crée une date "initiale" (au format epoch 01/01/1970T00:00:00)
        const maDate = new Date(0);
        // Change l'année, le mois et le jour de cette date
        maDate.setFullYear(ANNEE, Number(composantsDate[0]) - 1, Number(composantsDate[1]));
        // Retourne la date bien formatée au format français
        return maDate.toLocaleDateString();
    }

    /**
     * Dessiner la pop-up et de gérer son comportement
     */
    function dessinerPopup() {
        // Création de la pop-up, transparente dans un premier temps
        const popup = d3.select("#popup")
            .append("div")
            .classed("popup", true);

        // 3 fonctions permettant de gérer la pop-up en fonction de la souris et la case
        // Arrivée sur la case
        $(".caseok").mouseover(function () {
            const id = $(this).attr('id');
            popup
                .style("opacity", 1)
                .html(formaterCleDate(id));
        })
        // Mouvement sur la case 
        $(".caseok").mousemove(function (evt) {
            const [x, y] = d3.pointer(evt, $('#popup').get(0));
            popup
                .style("left", (x + 10) + "px")
                .style("top", y + "px");
        })
        // Quitter la case
        $(".caseok").mouseleave(function () {
            popup.style("opacity", 0);
        })
    }

    /**
     * Lire les données de conditions de circulation
     * @param {*} data
     * @return un dictionnaire sous la forme date : codeTrafic
     */
    const promesseTrafic = d3.csv("./data/calendrier.csv", function (data) {
        return {
            cle_date: Number(data.date.substring(3, 5)) + '-' + Number(data.date.substring(0, 2)),
            code_trafic: data.code_trafic
        }
    }).then((alldata) => {
        const dicoTrafic = {};
        alldata.forEach(data => {
            dicoTrafic[data.cle_date] = data.code_trafic
        });
        return dicoTrafic;
    });

    /**
     * Lire les données de qualité de l'air
     * @param {*} ville
     * @return un dictionnaire sous la forme date : codeQual
     */
    function lireDonneesQualAir(ville) {
        return d3.csv("./data/" + ville + ".csv", function (data) {
            return {
                code_qual: Number(data.code_qual),
                cle_date: Number(data.date_ech.substring(5, 7)) + '-' + Number(data.date_ech.substring(8, 10))   // alldata
            }
        }).then((alldata) => {
            const dicoQualite = {};
            alldata.forEach(data => {
                dicoQualite[data.cle_date] = data.code_qual
            });
            return dicoQualite;
        });
    }

    // Dessiner tous les calendriers en fonction des données
    Promise.all([promesseTrafic, lireDonneesQualAir("tours"), lireDonneesQualAir("blois"), lireDonneesQualAir("orleans")]).then(([dicoTrafic, dicoQualTours, dicoQualBlois, dicoQualOrleans]) => {

        dessinerCal(dicoQualTours, dicoTrafic, "tours", "3");
        dessinerCal(dicoQualBlois, dicoTrafic, "blois", "3");
        dessinerCal(dicoQualOrleans, dicoTrafic, "orleans", "3");
        
        dessinerTrait("tours");
        dessinerTrait("blois");
        dessinerTrait("orleans");

        dessinerPopup();

        $("#liste-mois-tours").change(function () {
            const mois = $(this).children("option:selected").val();
            dessinerCal(dicoQualTours, dicoTrafic, "tours", mois);
            dessinerPopup();
        });
        $("#liste-mois-blois").change(function () {
            const mois = $(this).children("option:selected").val();
            dessinerCal(dicoQualBlois, dicoTrafic, "blois", mois);
            dessinerPopup();
        });
        $("#liste-mois-orleans").change(function () {
            const mois = $(this).children("option:selected").val();
            dessinerCal(dicoQualOrleans, dicoTrafic, "orleans", mois);
            dessinerPopup();
        });

    })

    // Les calendriers sont draggables
    $(".calendar").draggable();

    /**
     * Déplacer la ligne lors du drag
     * @param {*} evt 
     */
    function deplacerLigne(evt) {
        let positionCal = $(this).offset();
        let idLigne = "#ligne-"+$(this).attr("id").substr(11);
        d3.select(idLigne).attr("x1", positionCal.left+20)
            .attr("y1", positionCal.top+20);
    }

    $(".calendar").on("drag",deplacerLigne);
    $(".calendar").on("dragend",deplacerLigne);

    /**
     * Remettre une ligne à sa position initiale
     * @param {*} calendrier 
     */
    function resetLigne(calendrier) {
        let positionCal = calendrier.offset();
        let idLigne = "#ligne-"+calendrier.attr("id").substr(11);
        d3.select(idLigne).attr("x1", positionCal.left+20)
            .attr("y1", positionCal.top+20);
    }

    /**
     * Remettre un calendrier à sa position initiale
     * @param {*} ville
     */
    function resetPosCalendriers(ville) {
        d3.select("#calendrier-"+ville).style("top",positionCalendriers[ville].top+"px");
        d3.select("#calendrier-"+ville).style("left",positionCalendriers[ville].left+"px");
    }

    /**
     * Remettre les calendriers et les lignes à leur position initiale lorsqu'on clique sur la flèche
     */
    $("#arrow").on("click", function() {
        resetPosCalendriers("tours");
        resetPosCalendriers("blois");
        resetPosCalendriers("orleans");
        resetLigne($("#calendrier-tours"));
        resetLigne($("#calendrier-blois"));
        resetLigne($("#calendrier-orleans"));
    })

    /**
     * Dessiner les traits qui relient les calendriers à leur ville
     * @param {*} ville 
     */
    function dessinerTrait(ville) {
        let positionCal = $("#calendrier-"+ville).offset();
        let positionVille = $("#"+ville).offset();
        
        let holder = d3.select("body")
            .append("svg")
            .attr("width", 449)
            .attr("height", 249)
            .style("position", "absolute")
            .style("overflow", "visible")
            .style("z-index", "-1");
        holder.append("line")
            .style("stroke", "#313131")
            .style("stroke-width", "3")
            .attr("x1", positionCal.left+20)
            .attr("y1", positionCal.top+20)
            .attr("x2", positionVille.left)
            .attr("y2", positionVille.top)
            .attr("id","ligne-"+ville);
    }


})
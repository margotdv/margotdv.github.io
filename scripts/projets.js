(function() {

    "use strict";
    document.addEventListener("DOMContentLoaded",init);

    function init() {
        let divs = document.querySelectorAll(".divHover");
        for (let div of divs) {
            div.addEventListener("mouseenter",mettreImageJaune);
            div.addEventListener("mouseleave", enleverImageJaune);
        }
    }

    function mettreImageJaune() {
        let hoverPic = this.querySelector(".hoverPic");
        hoverPic.classList.remove("invisible");
    }

    function enleverImageJaune() {
        let hoverPic = this.querySelector(".hoverPic");
        hoverPic.classList.add("invisible");
    }

}());
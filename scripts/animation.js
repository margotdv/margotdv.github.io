(function() {

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item-animation");

  function checkScroll() {
      items.forEach((item) => {
          const itemTop = item.getBoundingClientRect().top;
          const itemBottom = item.getBoundingClientRect().bottom;

          // Si l'élément est visible dans la fenêtre
          if (itemTop < window.innerHeight && itemBottom > 0) {
              item.style.opacity = 1;
              item.style.transform = "translateY(0)";
          }
      });
  }

  // Vérifiez lors du chargement de la page et lors du défilement
  checkScroll();
  window.addEventListener("scroll", checkScroll);
});

}());
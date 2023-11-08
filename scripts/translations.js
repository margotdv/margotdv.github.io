(function() {

  "use strict";
  document.addEventListener("DOMContentLoaded",init);

  let currentLanguage = localStorage.getItem('selectedLanguage') || 'fr';

  function init() {
    loadTranslation(currentLanguage);
    let languageBtns = document.querySelectorAll('.language-btn');

    // Ecouteur de clic sur les boutons
    languageBtns.forEach(button => {
      button.addEventListener('click', () => {
        const selectedLanguage = button.getAttribute('data-lang');
    
        if (selectedLanguage !== currentLanguage) {
          currentLanguage = selectedLanguage;
          loadTranslation(selectedLanguage);
          localStorage.setItem('selectedLanguage', selectedLanguage);
        }
      });
    })
  }

  // Charger la traduction
  function loadTranslation(language) {
    fetch(`../locales/${language}.json`)
    .then(response => response.json())
    .then(translations => {
      const elementsToUpdate = document.querySelectorAll('[data-i18n]');

      elementsToUpdate.forEach(element => {
        const translationKey = element.getAttribute('data-i18n');

        if (translations[translationKey]) {
          element.innerHTML = translations[translationKey];
        }
      });
    })

    .catch(error => console.error('Error loading translation:', error));
  }

}());

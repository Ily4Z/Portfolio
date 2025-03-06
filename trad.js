// Gestion des traductions
const translations = {
    en: null,
    fr: null,
};

// Charger les fichiers JSON de traduction
async function loadTranslations() {
    try {
        const enResponse = await fetch('en.json');
        translations.en = await enResponse.json();

        const frResponse = await fetch('fr.json');
        translations.fr = await frResponse.json();
    } catch (error) {
        console.error('Erreur lors du chargement des fichiers de traduction:', error);
    }
}

// Appliquer la traduction à la page
function applyTranslation(language) {
    if (!translations[language]) {
        console.error(`Traduction pour la langue "${language}" introuvable.`);
        return;
    }

    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        } else {
            console.warn(`Clé "${key}" non trouvée pour la langue "${language}".`);
        }
    });
}

// Changer la langue sélectionnée
async function changeLanguage(language) {
    if (!translations.en || !translations.fr) {
        await loadTranslations(); // Charger les traductions si ce n'est pas déjà fait
    }
    applyTranslation(language);

    // Mettre à jour l'affichage du bouton avec le drapeau et la langue
    updateCurrentLanguage(language);
}

// Mettre à jour l'affichage du bouton actuel
function updateCurrentLanguage(language) {
    const currentLanguageButton = document.getElementById('current-language');
    if (language === 'en') {
        currentLanguageButton.innerHTML = `<img src="https://flagcdn.com/w40/gb.png" alt="English" class="flag">`;
    } else if (language === 'fr') {
        currentLanguageButton.innerHTML = `<img src="https://flagcdn.com/w40/fr.png" alt="Français" class="flag">`;
    }
}

// Basculer la visibilité du menu de sélection de langue
function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Fermer le menu si on clique à l'extérieur
document.addEventListener('click', function (event) {
    const menu = document.getElementById('language-menu');
    const button = document.getElementById('current-language');
    if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// Sélectionner une langue via le menu
function selectLanguage(language) {
    changeLanguage(language); // Appliquer la traduction
    toggleLanguageMenu(); // Fermer le menu
}

// Charger les traductions au démarrage
window.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    applyTranslation('en'); // Langue par défaut : Anglais
    updateCurrentLanguage('en'); // Mettre à jour l'affichage initial du bouton
});

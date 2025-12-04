const translations = {
    en: null,
    fr: null,
};

// Charger les traductions depuis le dossier data/locales/
async function loadTranslations() {
    try {
        const enResponse = await fetch('data/locales/en.json');
        translations.en = await enResponse.json();

        const frResponse = await fetch('data/locales/fr.json');
        translations.fr = await frResponse.json();
    } catch (error) {
        console.error('Erreur de chargement des JSON:', error);
    }
}

function applyTranslation(language) {
    if (!translations[language]) {
        console.error(`Traduction pour la langue "${language}" introuvable.`);
        return;
    }

    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            element.innerHTML = translations[language][key];
        } else {
            console.warn(`Clé "${key}" non trouvée pour la langue "${language}".`);
        }
    });
}

async function changeLanguage(language) {
    if (!translations.en || !translations.fr) {
        await loadTranslations();
    }
    applyTranslation(language);
    // Sauvegarder la préférence utilisateur (Optionnel)
    localStorage.setItem('preferredLanguage', language);
}

// Initialisation au chargement
window.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    // Utiliser la langue préférée ou par défaut anglais
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);
    
    // Mettre à jour le drapeau initial si besoin (optionnel)
    const flagUrl = savedLang === 'fr' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png';
    const langBtn = document.getElementById("current-language");
    if(langBtn) langBtn.innerHTML = `<img src="${flagUrl}" class="flag">`;
});
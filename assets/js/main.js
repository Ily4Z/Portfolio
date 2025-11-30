document.addEventListener('DOMContentLoaded', () => {
    
    // --- GESTION DU BOUTON RETOUR EN HAUT ---
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- GESTION DU MENU LANGUE ---
    const langBtn = document.getElementById("current-language");
    const langMenu = document.getElementById("language-menu");
    const langOptions = document.querySelectorAll("#language-menu li");

    // Ouvrir/Fermer le menu
    langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.classList.toggle("show");
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener("click", () => {
        langMenu.classList.remove("show");
    });

    // Sélection d'une langue
    langOptions.forEach(option => {
        option.addEventListener("click", () => {
            const lang = option.getAttribute("data-lang");
            if (typeof changeLanguage === "function") {
                changeLanguage(lang); // Appel à la fonction de trad.js
            }
            // Mettre à jour le drapeau principal
            const imgSrc = option.querySelector("img").src;
            const imgAlt = option.querySelector("img").alt;
            langBtn.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}" class="flag">`;
        });
    });
});
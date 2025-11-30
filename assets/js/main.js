document.addEventListener('DOMContentLoaded', () => {
    
    // --- GESTION DU BOUTON RETOUR EN HAUT ---
    const backToTopBtn = document.getElementById("backToTop");
    // --- MENU HAMBURGER MOBILE ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu ul li a");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // 2. Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // 3. Fermer le menu si on clique en dehors du header (Optionnel mais recommandé)
    document.addEventListener("click", (e) => {
        const header = document.querySelector("header");
        if (!header.contains(e.target) && navMenu.classList.contains("active")) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

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

    // --- SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; // Distance avant déclenchement

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    // Déclencher une fois au chargement pour afficher le haut de page
    revealOnScroll();
});
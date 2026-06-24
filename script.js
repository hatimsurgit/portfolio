document.addEventListener('DOMContentLoaded', () => {
    
// --- GESTION DES FENÊTRES MODALES (S3 & S4) ---
    const saeButtons = document.querySelectorAll('.sae-item[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Ouvrir la bonne modale
    saeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Fermer les modales avec le bouton X
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Fermer en cliquant à l'extérieur de n'importe quelle modale
    document.querySelectorAll('dialog').forEach(modal => {
        modal.addEventListener('click', (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    });

    // RANDOMISATION DES LOGOS DE FOND
    const logos = document.querySelectorAll('.floating-logo');
    logos.forEach(logo => {
        const randomDelay = Math.random() * 5; 
        logo.style.animationDelay = `-${randomDelay}s`;
    });

    // --- LOGIQUE DU SLIDER EXPÉRIENCES ---
    const slider = document.getElementById('exp-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    if(slider && prevBtn && nextBtn) {
        // Clic sur bouton suivant
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
        });
        
        // Clic sur bouton précédent
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.offsetWidth, behavior: 'smooth' });
        });

        // Mise à jour des points quand on fait défiler le slider (au clic ou au doigt)
        slider.addEventListener('scroll', () => {
            // Calcule sur quel slide on se trouve
            const index = Math.round(slider.scrollLeft / slider.offsetWidth);
            
            // Met à jour la classe 'active' sur les petits points
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });

        // Permet de cliquer directement sur un petit point pour y aller
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slider.scrollTo({ left: slider.offsetWidth * index, behavior: 'smooth' });
            });
        });
    }
});
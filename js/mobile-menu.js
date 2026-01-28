document.addEventListener('DOMContentLoaded', () => {
    console.log('FMA Premium Mobile Menu: Initialized');

    // Selectors
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const menuOverlay = document.getElementById('mobile-menu-full');
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    const brand = document.querySelector('.mobile-brand');
    const body = document.body;

    // Logic
    function toggleMenu() {
        const isOpen = menuOverlay.classList.contains('active');

        if (!isOpen) {
            // OPEN
            menuOverlay.classList.add('active');
            toggleBtn.classList.add('open');
            body.classList.add('menu-open');
            
            // Optional: Hide Brand if it clashes with menu content? 
            // brand.style.opacity = '0';
        } else {
            // CLOSE
            menuOverlay.classList.remove('active');
            toggleBtn.classList.remove('open');
            body.classList.remove('menu-open');
            
            // brand.style.opacity = '1';
        }
    }

    // Event Listeners
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling issues
            toggleMenu();
        });
    } else {
        console.warn('Mobile Toggle Button not found in DOM');
    }

    // Close on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Allow transition to start
            setTimeout(() => {
                menuOverlay.classList.remove('active');
                toggleBtn.classList.remove('open');
                body.classList.remove('menu-open');
            }, 100);
        });
    });

    // Close on orientation change to reset potential layout bugs
    window.addEventListener('orientationchange', () => {
        if (menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            toggleBtn.classList.remove('open');
            body.classList.remove('menu-open');
        }
    });
});

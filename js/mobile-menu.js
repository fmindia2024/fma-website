document.addEventListener('DOMContentLoaded', () => {
    console.log('FMA Mobile Menu: Script Loaded');

    // 1. Define Menu HTML
    const menuHTML = `
        <div id="mobile-menu-overlay">
            <button class="mobile-menu-close" aria-label="Close Menu">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="mobile-menu-links">
                <a href="index.html" class="mobile-menu-link">Home</a>
                <a href="projects.html" class="mobile-menu-link">Projects</a>
                <a href="about.html" class="mobile-menu-link">About Us</a>
                <a href="blogs.html" class="mobile-menu-link">Blogs</a>
                <a href="contact.html" class="mobile-menu-link">Contact Us</a>
            </div>
            <div class="mobile-menu-footer">
                <a href="https://www.instagram.com/fma.in" target="_blank" class="mobile-social-icon">
                    <img src="images/instagram-5.png" alt="Instagram">
                </a>
                <a href="https://wa.me/917559977441" target="_blank" class="mobile-social-icon">
                     <img src="images/whatsapp-2.png" alt="WhatsApp">
                </a>
            </div>
        </div>
    `;

    // 2. Inject HTML if not already there
    if (!document.getElementById('mobile-menu-overlay')) {
        document.body.insertAdjacentHTML('beforeend', menuHTML);
    }

    // 3. Dom Elements
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = overlay.querySelector('.mobile-menu-close');
    // Try to find the hamburger button. Webflow often nests things.
    // The selector .menu-button.w-nav-button seems correct from index.html
    const hamburger = document.querySelector('.menu-button.w-nav-button');
    const links = overlay.querySelectorAll('.mobile-menu-link');

    // 4. Logic
    function openMenu() {
        console.log('FMA Mobile Menu: Opening Menu');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMenu() {
        console.log('FMA Mobile Menu: Closing Menu');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 5. Event Listeners
    if (hamburger) {
        console.log('FMA Mobile Menu: Hamburger button found');

        // Remove existing listeners by cloning the node? 
        // Or just use stopImmediatePropagation and ensure we run before Webflow (hard if webflow.js is already loaded).
        // Since we are loading at the end of body, webflow.js acts first usually if it's in head or before us.
        // BUT, we can clone the node to strip Webflow's events.

        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);

        newHamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openMenu();
        });

    } else {
        console.error('FMA Mobile Menu: Hamburger button NOT found.');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
});

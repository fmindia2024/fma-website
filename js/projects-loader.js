
document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('projects-grid');

    // Data from data.json
    const projects = [
        {
            "id": "wayanad-farm",
            "title": "Wayanad Farm",
            "category": "Residential",
            "year": "2024",
            "description": "Nestled in the lush landscapes of Wayanad, this farm stay is designed to blur the boundaries between the built environment and nature.",
            "image_main": "images/Work/Hospitality/wayanad farm/4.png"
        },
        {
            "id": "kodaikanal-weekend-home",
            "title": "Kodaikanal Weekend Home",
            "category": "Residential",
            "year": "2023",
            "description": "Perched on a misty hillside in Kodaikanal, this weekend retreat is an exercise in verticality and view-framing.",
            "image_main": "images/Work/Hospitality/kodaikanal weekend home/Scene 1.png"
        },
        {
            "id": "house-of-movement",
            "title": "House of Movement",
            "category": "Residential",
            "year": "2022",
            "description": "Designed for a pair of artists, the House of Movement features fluid spaces that encourage circulation and interaction.",
            "image_main": "images/Work/Residential/house of movement/9_upscale.png"
        },
        {
            "id": "house-of-saheer",
            "title": "House of Saheer",
            "category": "Residential",
            "year": "2023",
            "description": "A contemporary interpretation of traditional courtyard living organized around a central green space.",
            "image_main": "images/Work/Residential/house of saheer/1.png"
        },
        {
            "id": "villa-calma",
            "title": "Villa Calma",
            "category": "Residential",
            "year": "2025",
            "description": "True to its name, Villa Calma emphasizes serenity through minimalist design and monochromatic palettes.",
            "image_main": "images/Work/Residential/villa calma/1.png"
        },
        {
            "id": "house-in-bangalore",
            "title": "House in Bangalore",
            "category": "Residential",
            "year": "2021",
            "description": "Navigating a tight urban plot, this residence in Bangalore maximize volume and vertical connectivity.",
            "image_main": "images/Work/Interior/house in bangalore/1.png"
        },
        {
            "id": "ayurvedic-clinic",
            "title": "Ayurvedic Clinic",
            "category": "Commercial",
            "year": "2024",
            "description": "A healing space that embodies the principles of Ayurveda, using natural materials and earthy tones.",
            "image_main": "images/Work/Commercial/ayurvedic clinic/exterior 1.png"
        },
        {
            "id": "community-centre",
            "title": "Community Centre",
            "category": "Commercial",
            "year": "2024",
            "description": "A vibrant public space designed to foster social interaction and community engagement through open, flexible architecture.",
            "image_main": "images/Work/Commercial/community centre/4.png"
        },
        {
            "id": "competition-italy",
            "title": "Competition Italy",
            "category": "Concept",
            "year": "2020",
            "description": "Our entry for the Italian Design Competition explores the intersection of historic preservation and modern intervention.",
            "image_main": "images/Work/Others/competition italy/1.png"
        },
        {
            "id": "madurai-masjid",
            "title": "Madurai Masjid",
            "category": "Spiritual",
            "year": "2025",
            "description": "A contemporary mosque design that pays homage to traditional Islamic geometry while embracing modern construction techniques.",
            "image_main": "images/Work/Others/madurai masjid/Scene 1.png"
        },
        {
            "id": "oasis-competition",
            "title": "Oasis Competition",
            "category": "Competition",
            "year": "2023",
            "description": "A visionary proposal for a desert oasis, integrating sustainable water management with leisure and habitation.",
            "image_main": "images/Work/Others/oasis competition/1.jpg"
        }
    ];

    if (gridContainer) {
        projects.forEach(project => {
            // Create Card Container
            const card = document.createElement('a');
            card.className = 'blog-card'; // Reuse blog card class for style
            card.href = `detail_project.html?id=${project.id}`;

            // Image Wrapper
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'blog-image-wrapper';

            const img = document.createElement('img');
            img.className = 'blog-image';
            img.src = project.image_main;
            img.alt = project.title;
            img.loading = 'lazy';

            imgWrapper.appendChild(img);

            // Content
            const content = document.createElement('div');
            content.className = 'blog-card-content';

            // Meta
            const meta = document.createElement('div');
            meta.className = 'blog-meta';
            meta.textContent = `${project.category} — ${project.year}`;

            // Title
            const title = document.createElement('h2');
            title.className = 'blog-card-title';
            title.textContent = project.title;

            // Excerpt/Description
            const excerpt = document.createElement('p');
            excerpt.className = 'blog-excerpt';
            excerpt.textContent = project.description;

            // Assemble
            content.appendChild(meta);
            content.appendChild(title);
            content.appendChild(excerpt);

            card.appendChild(imgWrapper);
            card.appendChild(content);

            gridContainer.appendChild(card);
        });

        // Initialize Animations after content layout
        initAnimations();
    }
});

function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Entry Animation (Staggered)
        gsap.fromTo(".blog-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.2
            }
        );

        // 2. Mouse Move Parallax Logic
        const cards = document.querySelectorAll('.blog-card');

        cards.forEach(card => {
            const image = card.querySelector('.blog-image');
            const content = card.querySelector('.blog-card-content');

            // Mouse Move
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 768) return; // Disable on mobile

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate center
                const xCenter = rect.width / 2;
                const yCenter = rect.height / 2;

                // Tilt/Move factors
                const xMove = (x - xCenter) * 0.05; // range: -5% to 5%
                const yMove = (y - yCenter) * 0.05;

                // Apply slight movement to image (Parallax)
                if (image) {
                    gsap.to(image, {
                        x: -xMove, // Move opposite to mouse for depth
                        y: -yMove,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }

                // Optional: Move content slightly
                if (content) {
                    gsap.to(content, {
                        x: xMove * 0.5,
                        y: yMove * 0.5,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });

            // Mouse Leave - Reset
            card.addEventListener('mouseleave', () => {
                if (image) {
                    gsap.to(image, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
                if (content) {
                    gsap.to(content, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
}

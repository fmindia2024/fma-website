document.addEventListener('DOMContentLoaded', async function () {
    const gridContainer = document.getElementById('work-grid-container');
    if (!gridContainer) return;

    // --- Hardcoded Data Fallback (Redundant Safety) ---
    // Matches correctly with verified filesystem paths
    const FALLBACK_DATA = {
        "works": [
            {
                "id": "wayanad-farm",
                "title": "Wayanad Farm",
                "category": "Hospitality",
                "year": "2024",
                "client": "Private Client",
                "service": "Architecture & Landscape",
                "description": "Nestled in the lush landscapes of Wayanad, this farm stay is designed to blur the boundaries between the built environment and nature.",
                "image_main": "images/Work/Hospitality/wayanad farm/4.png",
                "image_bg": "images/Work/Hospitality/wayanad farm/5.png",
                "color": "#2E7D32",
            },
            {
                "id": "kodaikanal-weekend-home",
                "title": "Kodaikanal Weekend Home",
                "category": "Hospitality",
                "year": "2023",
                "client": "The Menon Family",
                "service": "Architecture",
                "description": "Perched on a misty hillside in Kodaikanal, this weekend retreat is an exercise in verticality and view-framing.",
                "image_main": "images/Work/Hospitality/kodaikanal weekend home/Scene 1.png",
                "image_bg": "images/Work/Hospitality/kodaikanal weekend home/Scene 2.png",
                "color": "#1565C0",
            },
            {
                "id": "house-of-movement",
                "title": "House of Movement",
                "category": "Residential",
                "year": "2022",
                "client": "Artist Couple",
                "service": "Architecture & Interior",
                "description": "Designed for a pair of artists, the House of Movement features fluid spaces that encourage circulation and interaction.",
                "image_main": "images/Work/Residential/house of movement/12.png",
                "image_bg": "images/Work/Residential/house of movement/8_upscale.png",
                "color": "#D84315",
            },
            {
                "id": "house-of-saheer",
                "title": "House of Saheer",
                "category": "Residential",
                "year": "2023",
                "client": "Mr. Saheer",
                "service": "Architecture",
                "description": "A contemporary interpretation of traditional courtyard living.",
                "image_main": "images/Work/Residential/house of saheer/1.png",
                "image_bg": "images/Work/Residential/house of saheer/2.png",
                "color": "#F9A825",
            },
            {
                "id": "villa-calma",
                "title": "Villa Calma",
                "category": "Residential",
                "year": "2025",
                "client": "Private Client",
                "service": "Architecture",
                "description": "True to its name, Villa Calma emphasizes serenity through minimalist design and monochromatic palettes.",
                "image_main": "images/Work/Residential/villa calma/1.png",
                "image_bg": "images/Work/Residential/villa calma/2.png",
                "color": "#00695C",
            },
            {
                "id": "house-in-bangalore",
                "title": "House in Bangalore",
                "category": "Interior",
                "year": "2021",
                "client": "IT Professional",
                "service": "Architecture",
                "description": "Navigating a tight urban plot, this residence in Bangalore maximize volume and vertical connectivity.",
                "image_main": "images/Work/Interior/house in bangalore/1.png",
                "image_bg": "images/Work/Interior/house in bangalore/2.png",
                "color": "#C62828",
            },
            {
                "id": "ayurvedic-clinic",
                "title": "Ayurvedic Clinic",
                "category": "Commercial",
                "year": "2024",
                "client": "Vaidya Healthcare",
                "service": "Architecture & Interior",
                "description": "A healing space that embodies the principles of Ayurveda.",
                "image_main": "images/Work/Commercial/ayurvedic clinic/exterior 1.png",
                "image_bg": "images/Work/Commercial/ayurvedic clinic/exterior 2.png",
                "color": "#4E342E",
            },
            {
                "id": "community-centre",
                "title": "Community Centre",
                "category": "Commercial",
                "year": "2024",
                "client": "Public Body",
                "service": "Public Architecture",
                "description": "A vibrant community hub designed to foster social interaction.",
                "image_main": "images/Work/Commercial/community centre/4.png",
                "image_bg": "images/Work/Commercial/community centre/Scene 2.png",
                "color": "#37474F",
            },
            {
                "id": "competition-italy",
                "title": "Competition Italy",
                "category": "Others",
                "year": "2020",
                "client": "Design Competition",
                "service": "Concept Design",
                "description": "Our entry for the Italian Design Competition explores the intersection of historic preservation and modern intervention.",
                "image_main": "images/Work/Others/competition italy/1.png",
                "image_bg": "images/Work/Others/competition italy/2.png",
                "color": "#6A1B9A",
            },
            {
                "id": "madurai-masjid",
                "title": "Madurai Masjid",
                "category": "Others",
                "year": "2025",
                "client": "Community Trust",
                "service": "Architecture",
                "description": "A contemporary mosque design that pays homage to traditional Islamic geometry.",
                "image_main": "images/Work/Others/madurai masjid/Scene 1.png",
                "image_bg": "images/Work/Others/madurai masjid/Scene 2.png",
                "color": "#FF8F00",
            },
            {
                "id": "oasis-competition",
                "title": "Oasis Competition",
                "category": "Others",
                "year": "2023",
                "client": "Competition",
                "service": "Concept",
                "description": "A visionary proposal for a sustainable desert oasis.",
                "image_main": "images/Work/Others/oasis competition/1.jpg",
                "image_bg": "images/Work/Others/oasis competition/2.jpg",
                "color": "#0097A7",
            }
        ]
    };

    const categories = [
        {
            id: 'commercial',
            name: 'Commercial',
            image: 'images/Work/Commercial/ayurvedic clinic/exterior 1.png'
        },
        {
            id: 'hospitality',
            name: 'Hospitality',
            image: 'images/Work/Hospitality/kodaikanal weekend home/Scene 21.png'
        },
        {
            id: 'interior',
            name: 'Interior',
            image: 'images/Work/Interior/house in bangalore/1.png'
        },
        {
            id: 'residential',
            name: 'Residential',
            image: 'images/Work/Residential/house of movement/9_upscale.png'
        },
        {
            id: 'others',
            name: 'Others',
            image: 'images/Work/Others/madurai masjid/Scene 1.png'
        }
    ];

    // --- Fetch Data from JSON with Fallback ---
    let projects = [];
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        projects = data.works;
    } catch (error) {
        console.warn("Unable to fetch data.json, falling back to internal data:", error);
        projects = FALLBACK_DATA.works;
    }

    // --- Logic ---

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const path = window.location.pathname;
    const isHome = path.endsWith('index.html') || path === '/' || path.match(/\/$/);

    // Clear Container
    gridContainer.innerHTML = '';

    if (categoryParam) {
        // 1. Specific Category Page
        console.log("Loading Category:", categoryParam);
        // Filter case-insensitive
        const filteredProjects = projects.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
        renderProjects(filteredProjects, gridContainer);

        // Update Page Title if possible
        updateCategoryTitle(categoryParam);

    } else if (isHome) {
        // 2. Home Page -> Show Categories
        console.log("Loading Home Categories");
        renderCategories(categories, gridContainer);
    } else {
        // 3. Projects Page (All) -> Show All Projects
        console.log("Loading All Projects");
        // If we are on projects.html without a category, we likely want to show all projects
        // using the full card design.
        renderProjects(projects, gridContainer);
    }

    // --- Render Functions ---

    function renderCategories(items, container) {
        const grid = document.createElement('div');
        grid.className = 'work-grid category-grid';

        items.forEach(cat => {
            const card = document.createElement('a');
            card.className = 'work-card category-card';
            // Link to the Category Page (projects.html with param)
            card.href = `projects.html?category=${cat.id}`;

            const bgImg = document.createElement('img');
            bgImg.className = 'work-card-bg';
            bgImg.src = cat.image;
            bgImg.alt = cat.name;
            bgImg.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'work-card-overlay';

            const content = document.createElement('div');
            content.className = 'work-card-content';

            const title = document.createElement('h3');
            title.className = 'work-card-title';
            title.textContent = cat.name;

            const subtitle = document.createElement('div');
            subtitle.className = 'work-card-category';
            subtitle.textContent = 'View Collection';

            content.appendChild(title);
            content.appendChild(subtitle);
            card.appendChild(bgImg);
            card.appendChild(overlay);
            card.appendChild(content);

            grid.appendChild(card);
        });
        container.appendChild(grid);
    }

    function renderProjects(items, container) {
        const listContainer = document.createElement('div');
        listContainer.className = 'project-list-container';

        if (items.length === 0) {
            const msg = document.createElement('div');
            msg.textContent = "No projects found in this category.";
            msg.style.color = "#fff";
            msg.style.padding = "20px";
            container.appendChild(msg);
            return;
        }

        items.forEach(project => {
            const card = document.createElement('a');
            card.className = 'project-full-card';
            card.href = `detail_project.html?id=${project.id}`;

            // Background Image
            const bgImg = document.createElement('img');
            bgImg.className = 'project-full-bg';
            // Use image_main from data.json
            bgImg.src = project.image_main;
            bgImg.alt = project.title;
            // Ensure background covers the card
            bgImg.style.width = '100%';
            bgImg.style.height = '100%';
            bgImg.style.objectFit = 'cover';
            bgImg.loading = 'lazy';

            // Overlay
            const overlay = document.createElement('div');
            overlay.className = 'project-full-overlay';

            // Content
            const content = document.createElement('div');
            content.className = 'project-full-content';

            const meta = document.createElement('div');
            meta.className = 'project-full-meta';
            // Safe access to year
            const yearStr = project.year || "Undefined";
            meta.textContent = `${project.category} — ${yearStr}`;

            const title = document.createElement('h2');
            title.className = 'project-full-title';
            title.textContent = project.title;

            // View Project Button (Visual)
            const btn = document.createElement('div');
            btn.className = 'project-full-btn';
            btn.textContent = 'View Project';

            content.appendChild(meta);
            content.appendChild(title);
            content.appendChild(btn);

            card.appendChild(bgImg);
            card.appendChild(overlay);
            card.appendChild(content);

            // 3D Hover Logic
            attach3DHover(card);

            listContainer.appendChild(card);
        });

        container.appendChild(listContainer);
    }

    function attach3DHover(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            // Calculate distance from center (normalized -1 to 1)
            const dx = (x - cx) / (rect.width / 2);
            const dy = (y - cy) / (rect.height / 2);

            // Reduced tilt for subtle effect on large cards
            const tiltX = -dy * 3;
            const tiltY = dx * 3;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    function updateCategoryTitle(catId) {
        const header = document.querySelector('h1.blog-title') || document.querySelector('.hero-main-title') || document.querySelector('h1');
        if (header) {
            header.textContent = catId.charAt(0).toUpperCase() + catId.slice(1);
        }
        const sub = document.querySelector('p.blog-subtitle');
        if (sub) {
            sub.textContent = `Selected works in ${catId}.`;
        }
    }
});

// Original Index Animation Logic
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.gsap && window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
            const titleEl = document.querySelector("#hero-main-title");
            const paraEl = document.querySelector("#hero-paragraph");
            if (titleEl && typeof SplitText !== 'undefined') {
                const splitTitle = new SplitText(titleEl, { type: "chars, words" });
                gsap.set(splitTitle.chars, { opacity: 0 });
                gsap.to(splitTitle.chars, {
                    opacity: 1,
                    stagger: 0.02,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#About",
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });
            } else if (titleEl) {
                gsap.fromTo(titleEl, { opacity: 0 }, { opacity: 1, duration: 1, scrollTrigger: { trigger: "#About", start: "top 75%", toggleActions: "play none none reverse" } });
            }
            if (paraEl) {
                gsap.fromTo(paraEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: "power2.out", scrollTrigger: { trigger: "#About", start: "top 75%", toggleActions: "play none none reverse" } });
            }
        }
    }, 100);
});

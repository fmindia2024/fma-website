
document.addEventListener('DOMContentLoaded', async () => {

    // --- Hardcoded Data Fallback (Redundant Safety for file:// protocol) ---
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
                "gallery": [
                    "images/Work/Hospitality/wayanad farm/4.png",
                    "images/Work/Hospitality/wayanad farm/5.png",
                    "images/Work/Hospitality/wayanad farm/8.png",
                    "images/Work/Hospitality/wayanad farm/9.png",
                    "images/Work/Hospitality/wayanad farm/12.png",
                    "images/Work/Hospitality/wayanad farm/13.png"
                ]
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
                "gallery": [
                    "images/Work/Hospitality/kodaikanal weekend home/Scene 1.png",
                    "images/Work/Hospitality/kodaikanal weekend home/Scene 2.png",
                    "images/Work/Hospitality/kodaikanal weekend home/Scene 3.png",
                    "images/Work/Hospitality/kodaikanal weekend home/Scene 4.png"
                ]
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
                "gallery": [
                    "images/Work/Residential/house of movement/12.png",
                    "images/Work/Residential/house of movement/8_upscale.png",
                    "images/Work/Residential/house of movement/10.png"
                ]
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
                "gallery": [
                    "images/Work/Residential/house of saheer/1.png",
                    "images/Work/Residential/house of saheer/2.png",
                    "images/Work/Residential/house of saheer/3.png"
                ]
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
                "gallery": [
                    "images/Work/Residential/villa calma/1.png",
                    "images/Work/Residential/villa calma/2.png",
                    "images/Work/Residential/villa calma/3.png"
                ]
            },
            {
                "id": "house-in-bangalore",
                "title": "House in Bangalore",
                "category": "Interior",
                "year": "2021",
                "client": "IT Professional",
                "service": "Architecture",
                "description": "Navigating a tight urban plot, this residence in Bangalore maximize volume and vertical connectivity.",
                "image_main": "images/Work/Interior/house in bangalore/1.webp",
                "image_bg": "images/Work/Interior/house in bangalore/2.png",
                "color": "#C62828",
                "gallery": [
                    "images/Work/Interior/house in bangalore/1.webp",
                    "images/Work/Interior/house in bangalore/2.png",
                    "images/Work/Interior/house in bangalore/3.png"
                ]
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
                "gallery": [
                    "images/Work/Commercial/ayurvedic clinic/exterior 1.png",
                    "images/Work/Commercial/ayurvedic clinic/exterior 2.png",
                    "images/Work/Commercial/ayurvedic clinic/interior 1.png"
                ]
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
                "gallery": [
                    "images/Work/Commercial/community centre/4.png",
                    "images/Work/Commercial/community centre/5.png",
                    "images/Work/Commercial/community centre/Scene 2.png"
                ]
            },
            {
                "id": "competition-italy",
                "title": "Competition Italy",
                "category": "Concept",
                "year": "2020",
                "client": "Design Competition",
                "service": "Concept Design",
                "description": "Our entry for the Italian Design Competition explores the intersection of historic preservation and modern intervention.",
                "image_main": "images/Work/Others/competition italy/1.png",
                "image_bg": "images/Work/Others/competition italy/2.png",
                "color": "#6A1B9A",
                "gallery": [
                    "images/Work/Others/competition italy/1.png",
                    "images/Work/Others/competition italy/2.png",
                    "images/Work/Others/competition italy/3.png"
                ]
            },
            {
                "id": "madurai-masjid",
                "title": "Madurai Masjid",
                "category": "Spiritual",
                "year": "2025",
                "client": "Community Trust",
                "service": "Architecture",
                "description": "A contemporary mosque design that pays homage to traditional Islamic geometry.",
                "image_main": "images/Work/Others/madurai masjid/Scene 1.png",
                "image_bg": "images/Work/Others/madurai masjid/Scene 2.png",
                "color": "#FF8F00",
                "gallery": [
                    "images/Work/Others/madurai masjid/Scene 1.png",
                    "images/Work/Others/madurai masjid/Scene 2.png",
                    "images/Work/Others/madurai masjid/Scene 3.png"
                ]
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
                "gallery": [
                    "images/Work/Others/oasis competition/1.jpg",
                    "images/Work/Others/oasis competition/2.jpg",
                    "images/Work/Others/oasis competition/3.jpg"
                ]
            }
        ]
    };

    // 1. Get Project ID
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) {
        console.error("No project ID specified.");
        return;
    }

    // 2. Fetch Data
    let project = null;
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Unavailable");
        const data = await response.json();
        project = data.works.find(p => p.id === projectId || p.slug === projectId);
    } catch (error) {
        console.warn("Using fallback data for detail page:", error);
        project = FALLBACK_DATA.works.find(p => p.id === projectId || p.slug === projectId);
    }

    if (!project) {
        document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:100px;'>Project not found</h1>";
        return;
    }

    // 3. Populate
    populateProject(project);
});

// --- Premium Architectural Palette (Dark Modes) ---
const ARCH_PALETTE = [
    '#0e1111',
    '#13151a',
    '#191716',
    '#111111',
    '#141416',
    '#0f1315'
];

function populateProject(project) {
    // A. Hero Section with Parallax Wrapper
    const heroSection = document.querySelector('.project-hero-editorial');
    const heroImg = document.getElementById('project-hero-image');

    // Create wrapper if not exists (for parallax)
    if (heroSection && heroImg) {
        if (!heroSection.querySelector('.hero-image-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'hero-image-wrapper';
            heroSection.insertBefore(wrapper, heroImg);
            wrapper.appendChild(heroImg);
        }

        // Encode URI to handle spaces safely
        heroImg.src = encodeURI(project.image_main || project.image_bg);
    }

    // New Header Structure
    const overlay = document.querySelector('.hero-overlay-minimal');
    if (overlay) {
        overlay.innerHTML = `
            <div class="hero-header-content">
                <h1 class="hero-title-editorial">${project.title}</h1>
                <div class="hero-meta-wrapper">
                    <span>${project.category}</span>
                    <span>—</span>
                    <span>${project.year || '2024'}</span>
                </div>
            </div>
            <div class="hero-desc-wrapper">
                <p class="hero-desc-text">${project.description}</p>
                <div class="hero-facts-row">
                    <div class="fact-item">
                        <span class="fact-label">Client</span>
                        <span class="fact-value">${project.client || 'Private'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Hide old intro if present
    const oldIntro = document.querySelector('.project-intro-editorial');
    if (oldIntro) oldIntro.style.display = 'none';

    // B. Build Gallery Sections with VARIED LAYOUTS & COLORS (Smart Grouping)
    const galleryContainer = document.getElementById('project-gallery');
    if (galleryContainer && project.gallery) {
        galleryContainer.innerHTML = '';
        galleryContainer.className = 'project-gallery-editorial';

        let imageIndex = 0;
        let sectionIndex = 0;

        // Loop through images to create grouped sections
        // Pattern: [Full] -> [Split] -> [Full] -> [Split]
        while (imageIndex < project.gallery.length) {

            // Determine type based on section index to alternate rhythm
            // Even sections = Full Width (Cinematic)
            // Odd sections = Split View (2 images side-by-side)
            const isSplitLayout = (sectionIndex % 2 !== 0);

            // Create Section Wrapper
            const section = document.createElement('div');
            const color = ARCH_PALETTE[sectionIndex % ARCH_PALETTE.length];
            section.style.backgroundColor = color;

            // Logic: Can we make a split layout? Only if we have at least 2 images left
            if (isSplitLayout && (imageIndex + 1 < project.gallery.length)) {
                // SPLIT LAYOUT
                section.className = 'gallery-section-wrapper layout-split';

                // Add Image 1
                const card1 = createPhotoCard(project.gallery[imageIndex], project.title, imageIndex);
                section.appendChild(card1);
                imageIndex++;

                // Add Image 2
                const card2 = createPhotoCard(project.gallery[imageIndex], project.title, imageIndex);
                section.appendChild(card2);
                imageIndex++;

            } else {
                // FULL LAYOUT (Or fallback if only 1 image left for a split)
                section.className = 'gallery-section-wrapper layout-full';
                const card = createPhotoCard(project.gallery[imageIndex], project.title, imageIndex);
                section.appendChild(card);
                imageIndex++;
            }

            galleryContainer.appendChild(section);
            sectionIndex++;
        }
    }

    // C. Secondary Image (Parallax Footer)
    const secondaryImg = document.getElementById('project-secondary-image');
    if (secondaryImg && project.image_bg) {
        secondaryImg.src = encodeURI(project.image_bg);
    }

    // D. Initialize Animations
    setTimeout(initAnimations, 100);
}

function createPhotoCard(src, title, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const img = document.createElement('img');
    img.src = encodeURI(src);
    img.alt = `${title} View ${index + 1}`;

    // Interaction overlay
    const hoverInfo = document.createElement('div');
    hoverInfo.className = 'card-hover-info';
    hoverInfo.innerHTML = `<span class="hover-label">View Detail ${index + 1}</span>`;

    card.appendChild(img);
    card.appendChild(hoverInfo);

    // Add Parallax Mouse Move Listener
    card.addEventListener('mousemove', handleHoverMove);
    card.addEventListener('mouseleave', handleHoverReset);

    return card;
}

// --- Interaction Logic ---

function handleHoverMove(e) {
    const card = e.currentTarget;
    const img = card.querySelector('img');
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Parallax Effect
    img.style.transform = `scale(1.05) translate(${-x * 30}px, ${-y * 30}px)`;
    card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
}

function handleHoverReset(e) {
    const card = e.currentTarget;
    const img = card.querySelector('img');

    // Reset defaults
    img.style.transform = `scale(1) translate(0, 0)`;
    card.style.transform = `perspective(1000px) rotateY(0) rotateX(0)`;
}

// --- Animation Logic ---

function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        document.querySelectorAll('.hero-title-editorial, .hero-meta-wrapper, .hero-desc-wrapper, .photo-card').forEach(el => {
            el.style.opacity = 1;
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Parallax
    gsap.to('.hero-image-wrapper', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.project-hero-editorial',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 2. Hero Content Reveal
    const tl = gsap.timeline();
    const title = document.querySelector('.hero-title-editorial');
    if (typeof SplitText !== 'undefined' && title) {
        if (title.split) title.split.revert();
        try {
            const split = new SplitText(title, { type: "chars, words" });
            tl.from(split.chars, {
                duration: 1.2,
                y: 100,
                opacity: 0,
                stagger: 0.02,
                ease: "power4.out"
            });
        } catch (e) {
            tl.fromTo('.hero-title-editorial', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
        }
    } else {
        tl.fromTo('.hero-title-editorial', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    }

    tl.to('.hero-meta-wrapper', { opacity: 1, y: 0, duration: 1 }, "-=0.8");
    tl.to('.hero-desc-wrapper', { opacity: 1, y: 0, duration: 1 }, "-=0.8");

    // 3. Gallery Sections Reveal
    const cards = gsap.utils.toArray('.photo-card');
    cards.forEach(card => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            }
        });
    });
}

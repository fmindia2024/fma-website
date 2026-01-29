/**
 * Global Animation System
 * - Smooth Scroll (Lenis)
 * - Page Preloader
 * - Scroll Reveal Animations (GSAP ScrollTrigger)
 */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Initialize Lenis (Smooth Scroll)
    // Check if Lenis is loaded
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis to GSAP ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    // 2. Preloader Animation (Blueprint Style)
    const preloader = document.getElementById('global-preloader');

    // Check if we've already shown the intro in this session
    const introShown = sessionStorage.getItem("fma_intro_shown");

    if (preloader) {
        if (introShown) {
            // ALREADY SHOWN: Hide immediately, no animation
            preloader.style.display = 'none';
            triggerHeroAnimations();
        } else {
            // FIRST TIME: Run Blueprint Animation
            runBlueprintAnimation(preloader, () => {
                // On Complete
                sessionStorage.setItem("fma_intro_shown", "true");
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        preloader.style.display = 'none';
                        triggerHeroAnimations();
                    }
                });
            });
        }
    }

    function runBlueprintAnimation(container, onComplete) {
        // 1. Setup Canvas
        container.innerHTML = '';
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cx = canvas.width / 2;
            cy = canvas.height / 2;
        });

        // --- 3D Engine Setup ---
        const points = [];
        const lines = [];

        // Helper to add box
        function addBox(x, y, z, w, h, d) {
            const startIdx = points.length;
            // 8 corners
            points.push({ x: x, y: y, z: z });          // 0: flu
            points.push({ x: x + w, y: y, z: z });      // 1: fru
            points.push({ x: x + w, y: y - h, z: z });  // 2: frd
            points.push({ x: x, y: y - h, z: z });      // 3: fld
            points.push({ x: x, y: y, z: z + d });      // 4: blu
            points.push({ x: x + w, y: y, z: z + d });      // 5: bru
            points.push({ x: x + w, y: y - h, z: z + d }); // 6: brd
            points.push({ x: x, y: y - h, z: z + d });  // 7: bld

            // 12 edges
            const edges = [
                [0, 1], [1, 2], [2, 3], [3, 0], // Front Face
                [4, 5], [5, 6], [6, 7], [7, 4], // Back Face
                [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting
            ];
            edges.forEach(e => lines.push([startIdx + e[0], startIdx + e[1]]));
        }

        // Create "Architecture" (Modern House Composition)
        // Base Unit
        addBox(-100, 50, -50, 200, 100, 100);
        // Cantilever Upper Unit (Shifted)
        addBox(-80, 140, -60, 220, 90, 120);
        // Vertical Element (Chimney/Tower)
        addBox(60, 160, -20, 30, 200, 40);

        // Animation State
        let rotation = 0;
        const totalDuration = 2.5; // Seconds
        let startTime = null;

        function project(p, angle) {
            // Rotate Y
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const x = p.x * cos - p.z * sin;
            const z = p.x * sin + p.z * cos;
            const y = p.y; // Keep Y same

            // Perspective
            const fov = 600;
            const dist = 800; // Camera distance
            const scale = fov / (dist + z); // Z is depth here relative to camera

            // Isometric-ish tweak for "Architectural Look"
            // Let's stick to true perspective for "Magical" feel
            return {
                x: cx + x * scale,
                y: cy - y * scale, // Flip Y for canvas
                s: scale
            };
        }

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000;
            const progress = Math.min(elapsed / totalDuration, 1);

            // Clear
            ctx.fillStyle = '#0b0b0b';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update rotation slowly
            rotation = elapsed * 0.2; // Slow spin

            // Draw Lines
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;

            // Determine how many lines to draw based on progress
            // We want lines to 'grow'
            const linesToDraw = lines.length * Math.min(progress * 1.5, 1); // Draw structure faster

            for (let i = 0; i < lines.length; i++) {
                if (i > linesToDraw) break;

                const p1 = project(points[lines[i][0]], rotation);
                const p2 = project(points[lines[i][1]], rotation);

                // Opacity fade for entered lines
                const alpha = Math.min((linesToDraw - i), 1);
                const isLeadLine = (i > linesToDraw - 1); // The line currently forming

                ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.2, alpha)})`;
                ctx.lineWidth = isLeadLine ? 2 : 0.8;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                // Animate line length for the 'leading' line could be overkill, 
                // straightforward drawing is cleaner for complex wireframe.
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();

                // "Magical Spark" at vertices of newly drawn lines
                if (isLeadLine || (Math.random() > 0.95 && i < linesToDraw)) {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.beginPath();
                    ctx.arc(p2.x, p2.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Draw Logo "Crafting"
            if (progress > 0.2) {
                const logoProgress = (progress - 0.2) / 0.8; // 0 to 1

                ctx.save();
                ctx.translate(cx, cy);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const fontSize = Math.min(canvas.width * 0.15, 120);
                ctx.font = `700 ${fontSize}px Helvetica, Arial, sans-serif`;

                // 1. Text Outline (Stroke) - Animates dash array
                if (logoProgress < 1) {
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 1.5;
                    // Giant dash array trick: set dash to [progress * len, len]
                    // Since specific length is unknown, we estimate high or use simple fade for stroke
                    // Using lineDash with time offset for "ants" effect or just simple stroke
                    const dashLen = 500; // Arbitrary large enough
                    ctx.setLineDash([dashLen * logoProgress, dashLen]);
                    ctx.strokeText("FMA.", 0, 0);
                }

                // 2. Text Fill (Fade in)
                if (logoProgress > 0.5) {
                    const fillAlpha = (logoProgress - 0.5) / 0.5;
                    ctx.fillStyle = `rgba(255, 255, 255, ${fillAlpha})`;
                    ctx.fillText("FMA.", 0, 0);
                }

                // 3. Underline "Crafting"
                const textM = ctx.measureText("FMA.");
                const w = textM.width;
                const h = fontSize / 2;

                ctx.strokeStyle = 'rgba(255,255,255,0.8)';
                ctx.lineWidth = 3;
                ctx.setLineDash([]); // Reset

                const lineProgress = Math.min(logoProgress * 1.5, 1);
                ctx.beginPath();
                ctx.moveTo(-w / 2, h + 20);
                ctx.lineTo((-w / 2) + (w * lineProgress), h + 20);
                ctx.stroke();

                ctx.restore();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (onComplete) onComplete();
            }
        }

        requestAnimationFrame(animate);
    }

    // 3. Scroll Reveals (GSAP ScrollTrigger)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // A. Reveal Text (Headings, Paragraphs with class .reveal-text)
        // Or we can target all h1, h2, p inside main sections if specific classes aren't present
        const textElements = document.querySelectorAll('.reveal-text, h1:not(.hero-title), h2, p:not(.hero-desc)');

        textElements.forEach(el => {
            // Skip elements that are already visible or don't need animation
            if (el.closest('.footer') || el.closest('#global-preloader')) return;

            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Trigger when top of element hits 85% of viewport height
                        toggleActions: "play none none reverse" // Reverses on scroll up for "alive" feel
                    }
                }
            );
        });

        // B. Reveal Images (Cards, Photos)
        const imageElements = document.querySelectorAll('.reveal-img, img:not(.no-anim)');
        imageElements.forEach(el => {
            if (el.closest('#global-preloader') || el.closest('.hero-bg')) return;

            gsap.fromTo(el,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // C. Section Fade
        const sections = document.querySelectorAll('section');
        sections.forEach(sec => {
            gsap.fromTo(sec,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 90%",
                        end: "top 20%",
                        scrub: false
                    }
                }
            );
        });
    }

    function triggerHeroAnimations() {
        // Find hero elements and animate them specifically
        // This runs after the preloader lifts
        const heroTitle = document.querySelector('h1');
        const heroNav = document.querySelector('.navigation-wrapper-main');

        if (heroNav) {
            gsap.fromTo(heroNav, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
        }
        if (heroTitle) {
            gsap.fromTo(heroTitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4 });
        }
    }
});

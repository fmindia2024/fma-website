/**
 * Architectural Time-Based Header System
 * 
 * Logic:
 * - Real-time clock determines Day (06:00-18:00) or Night (18:00-06:00).
 * - Animation Loop lasts exactly 5 minutes (300 seconds).
 * - Elements move with extreme slowness and precision.
 * 
 * Performance:
 * - Mobile optimized (reduced particle count).
 * - Canvas recycling.
 */

(function () {
    const canvas = document.getElementById('architecture-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let isMobile = false;

    // --- Configuration ---
    const CONFIG = {
        // Palette
        colors: {
            daySky: { top: '#4A6FA5', bottom: '#1A1B4B' }, // Warmer blue top, deep bottom
            nightSky: { top: '#0B0C2A', bottom: '#050510' }, // Deep architectural night
            sun: '#FFFBEB', // Architectural White-Gold
            moon: '#F0F4F8', // Cool White
            cloud: 'rgba(255, 255, 255, 0.12)', // Subtle
            star: 'rgba(255, 255, 255, 0.7)'
        },
        // Timing
        cycleDuration: 300000, // 5 minutes in ms
    };

    // --- State ---
    let lastTime = 0;
    let cycleProgress = 0; // 0 to 1 over 5 mins
    let isDay = true;

    // --- Elements ---
    let clouds = [];
    let birds = [];
    let stars = [];
    let comets = [];

    // --- Initialization ---
    function init() {
        resize();
        window.addEventListener('resize', resize);

        // Initial check
        checkTimeOfDay();
        setInterval(checkTimeOfDay, 60000); // Check every minute

        initParticles();
        requestAnimationFrame(animate);
    }

    function checkTimeOfDay() {
        const hour = new Date().getHours();
        isDay = (hour >= 6 && hour < 18);
    }

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        isMobile = rect.width < 768;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        width = rect.width;
        height = rect.height;

        initParticles(); // Re-init on resize to distribute correctly
    }

    function initParticles() {
        // CLOUDS (Day)
        clouds = [];
        const cloudCount = isMobile ? 3 : 6;
        for (let i = 0; i < cloudCount; i++) {
            // Generate puffs for organic cloud shape
            const puffCount = 5 + Math.floor(Math.random() * 5); // 5-9 puffs
            const puffs = [];
            for (let j = 0; j < puffCount; j++) {
                puffs.push({
                    xOff: (Math.random() - 0.5) * 60,
                    yOff: (Math.random() - 0.5) * 30,
                    r: 20 + Math.random() * 25
                });
            }

            clouds.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.4,
                speed: 0.05 + Math.random() * 0.05, // Very slow
                size: 0.5 + Math.random() * 0.8,
                puffs: puffs
            });
        }

        // BIRDS (Day)
        birds = [];
        if (isMobile) {
            // Mobile: 1 Soaring bird
            birds.push({ type: 'soar', x: -50, y: height * 0.4, speed: 0.4, glide: 0 });
        } else {
            // Desktop: Full set
            // 1. Soaring (Single)
            birds.push({ type: 'soar', x: -50, y: height * 0.3, speed: 0.4, glide: 0 });
            // 2. Directional (Pair)
            birds.push({ type: 'direct', x: width + 50, y: height * 0.5, speed: -0.6, wing: 0 });
            birds.push({ type: 'direct', x: width + 80, y: height * 0.55, speed: -0.6, wing: 0.5 });
            // 3. Distant Flock
            for (let k = 0; k < 5; k++) {
                birds.push({ type: 'flock', x: Math.random() * width, y: height * 0.2 + Math.random() * (height * 0.2), speed: 0.2 });
            }
        }

        // STARS (Night)
        stars = [];
        const starCount = isMobile ? 40 : 100;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.8,
                size: Math.random() * 1.5,
                opacity: 0.2 + Math.random() * 0.6,
                pulse: Math.random() * Math.PI
            });
        }
    }

    // --- Helpers ---
    function getArcPosition(progress, startX, endX, apexY) {
        // Quadratic Bezier or Sinusoidal Arc
        // x moves linearly from startX to endX
        // y arcs up to apexY at 0.5 progress
        const x = startX + (endX - startX) * progress;
        // Sin wave for height: sin(0)=0, sin(PI/2)=1, sin(PI)=0
        const arcHeight = Math.sin(progress * Math.PI);
        const y = (height * 0.7) - (arcHeight * apexY);
        return { x, y };
    }

    // --- Drawing ---

    function drawClouds() {
        ctx.fillStyle = CONFIG.colors.cloud;
        clouds.forEach(c => {
            c.x += c.speed;
            if (c.x > width + 100) c.x = -100;

            ctx.beginPath();
            if (c.puffs) {
                c.puffs.forEach(p => {
                    const px = c.x + p.xOff * c.size;
                    const py = c.y + p.yOff * c.size;
                    const pr = p.r * c.size;
                    // Move to start of arc to avoid connecting lines
                    ctx.moveTo(px + pr, py);
                    ctx.arc(px, py, pr, 0, Math.PI * 2);
                });
            }
            ctx.fill();
        });
    }

    function drawBirds(timeVal) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

        birds.forEach(b => {
            // Logic varies by type
            if (b.type === 'soar') {
                b.x += b.speed;
                if (b.x > width + 50) b.x = -50;

                // Slow glide wave
                const yOff = Math.sin(timeVal * 0.001) * 10;
                ctx.beginPath();
                ctx.moveTo(b.x - 5, b.y + yOff);
                ctx.quadraticCurveTo(b.x, b.y + yOff - 2, b.x + 5, b.y + yOff);
                ctx.stroke();
            }
            else if (b.type === 'direct') {
                b.x += b.speed;
                if (b.x < -50) b.x = width + 50;

                // Flap
                const flap = Math.sin(timeVal * 0.01 + b.wing) * 3;
                ctx.beginPath();
                ctx.moveTo(b.x - 3, b.y - flap);
                ctx.lineTo(b.x, b.y);
                ctx.lineTo(b.x + 3, b.y - flap);
                ctx.stroke();
            }
            else if (b.type === 'flock') {
                b.x += b.speed;
                if (b.x > width + 20) b.x = -20;
                ctx.beginPath(); ctx.arc(b.x, b.y, 1, 0, Math.PI * 2); ctx.fill();
            }
        });
    }

    function drawStars(timeVal) {
        stars.forEach(s => {
            // Gentle shimmering (non-blinking)
            const shimmer = Math.sin(timeVal * 0.002 + s.pulse) * 0.2 + 0.8;
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * shimmer})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawComet() {
        // Random rare spawn logic controlled externally or purely random here
        if (Math.random() < 0.002) { // Rare
            comets.push({ x: width * 0.8 + Math.random() * 200, y: 0, vx: -2, vy: 1, alpha: 1 });
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.)';

        for (let i = comets.length - 1; i >= 0; i--) {
            const c = comets[i];
            c.x += c.vx;
            c.y += c.vy;
            c.alpha -= 0.005;

            if (c.alpha <= 0) {
                comets.splice(i, 1);
                continue;
            }

            // Draw
            const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 10, c.y - c.vy * 10);
            grad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(c.x + 40, c.y - 20); // Tail
            ctx.stroke();
        }
    }

    // --- Main Loop ---
    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;

        // Progress Cycle (0 to 1 over 5 mins)
        // Using modulo to loop seamlessly
        cycleProgress = (timestamp % CONFIG.cycleDuration) / CONFIG.cycleDuration;

        // 1. Background
        const colors = isDay ? CONFIG.colors.daySky : CONFIG.colors.nightSky;
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, colors.top);
        grad.addColorStop(1, colors.bottom);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // 2. Celestial Body (Sun or Moon)
        const orbPos = getArcPosition(cycleProgress, -100, width + 100, height * 0.5);

        // Glow
        const glowRadius = isDay ? 60 : 40;
        const glowColor = isDay ? 'rgba(255, 251, 235, 0.15)' : 'rgba(240, 244, 248, 0.1)';

        const orbGrad = ctx.createRadialGradient(orbPos.x, orbPos.y, 10, orbPos.x, orbPos.y, glowRadius);
        orbGrad.addColorStop(0, glowColor);
        orbGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = orbGrad;
        ctx.beginPath(); ctx.arc(orbPos.x, orbPos.y, glowRadius, 0, Math.PI * 2); ctx.fill();

        // Core
        ctx.fillStyle = isDay ? CONFIG.colors.sun : CONFIG.colors.moon;
        ctx.beginPath(); ctx.arc(orbPos.x, orbPos.y, isDay ? 15 : 12, 0, Math.PI * 2); ctx.fill();

        // 3. Atmosphere
        if (isDay) {
            drawClouds();
            drawBirds(timestamp);
        } else {
            drawStars(timestamp);
            drawComet();
        }

        requestAnimationFrame(animate);
    }

    init();

})();

const canvas = document.getElementById('architecture-bg');
const ctx = canvas.getContext('2d');

let width, height;
let mx = 0, my = 0; // Mouse

// Theme
const COLORS = {
    bg: '#2C2E81',
    point: 'rgba(120, 180, 255, 0.8)',
    line: 'rgba(255, 255, 255, 0.12)',
    lineHighlight: 'rgba(255, 255, 255, 0.4)'
};

// 3D Grid Params
const GRID_ROWS = 25;
const GRID_COLS = 35;
const SPACING = 40;
let points = [];
let time = 0;

function resize() {
    const parent = canvas.parentElement;
    width = parent.clientWidth;
    height = parent.clientHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initGrid();
}

class Point3D {
    constructor(x, y, z) {
        this.baseX = x;
        this.baseY = y;
        this.baseZ = z;

        this.x = x;
        this.y = y;
        this.z = z;

        // Screen projection coords
        this.sx = 0;
        this.sy = 0;
        this.scale = 1;
    }

    update(t) {
        // Parametric Wave Effect (Zaha Hadid style)
        // Combine sine waves for organic undulation
        const d = Math.sqrt(this.baseX * this.baseX + this.baseZ * this.baseZ);

        const wave1 = Math.sin(this.baseX * 0.005 + t * 0.002) * 50;
        const wave2 = Math.cos(this.baseZ * 0.005 + t * 0.003) * 50;
        const wave3 = Math.sin(d * 0.002 - t * 0.001) * 80;

        // Mouse influence (Tilt nearby points)
        // Map mouse to world rough coords
        const mouseXWorld = (mx - width / 2) * 2;
        const mouseYWorld = (my - height / 2) * 2;

        const distToMouse = Math.sqrt(Math.pow(this.baseX - mouseXWorld, 2) + Math.pow(this.baseZ - mouseYWorld, 2));
        const mouseWave = Math.max(0, 300 - distToMouse) * 0.2;

        this.y = this.baseY + wave1 + wave2 + wave3 - mouseWave;
    }

    project(fov) {
        // Camera Transform
        // Rotate scene slightly
        const angleY = time * 0.0001 + (mx / width) * 0.2;
        const angleX = 0.2; // Tilt down

        // 1. Rotate Y
        let x1 = this.x * Math.cos(angleY) - this.z * Math.sin(angleY);
        let z1 = this.z * Math.cos(angleY) + this.x * Math.sin(angleY);

        // 2. Rotate X
        let y2 = this.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = z1 * Math.cos(angleX) + this.y * Math.sin(angleX);

        // 3. Project
        const scale = fov / (fov + z2 + 800); // +800 pushes it back
        this.sx = x1 * scale + width / 2;
        this.sy = y2 * scale + height / 2;
        this.scale = scale;
    }
}

function initGrid() {
    points = [];
    // Create centered grid flat on X-Z plane
    const startX = -(GRID_COLS * SPACING) / 2;
    const startZ = -(GRID_ROWS * SPACING) / 2;

    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            points.push(new Point3D(
                startX + c * SPACING,
                0, // Y is up/down
                startZ + r * SPACING
            ));
        }
    }
}

function animate() {
    time += 16;

    // Clear
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    // Slight vignette for depth
    const grad = ctx.createRadialGradient(width / 2, height / 2, width * 0.2, width / 2, height / 2, width);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Update and Project
    const fov = 600;
    points.forEach(p => {
        p.update(time);
        p.project(fov);
    });

    // Draw Connections
    ctx.lineWidth = 1;

    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const i = r * GRID_COLS + c;
            const p = points[i];

            // Skip if point is behind camera or too far off screen
            if (p.scale < 0) continue;

            // Connect Right
            if (c < GRID_COLS - 1) {
                const right = points[i + 1];
                if (right.scale > 0) {
                    // Distance based alpha?
                    const alpha = Math.min(1, p.scale * 1.5); // Fade distant
                    ctx.strokeStyle = COLORS.line;
                    ctx.globalAlpha = alpha;
                    ctx.beginPath();
                    ctx.moveTo(p.sx, p.sy);
                    ctx.lineTo(right.sx, right.sy);
                    ctx.stroke();
                }
            }

            // Connect Down
            if (r < GRID_ROWS - 1) {
                const down = points[i + GRID_COLS];
                if (down.scale > 0) {
                    const alpha = Math.min(1, p.scale * 1.5);
                    ctx.strokeStyle = COLORS.line;
                    ctx.globalAlpha = alpha;
                    ctx.beginPath();
                    ctx.moveTo(p.sx, p.sy);
                    ctx.lineTo(down.sx, down.sy);
                    ctx.stroke();
                }
            }

            // Draw Point (Nodes)
            // Only draw closer nodes to avoid clutter
            if (p.scale > 0.6) {
                ctx.globalAlpha = p.scale;
                ctx.fillStyle = COLORS.point;
                ctx.beginPath();
                ctx.arc(p.sx, p.sy, 1.5 * p.scale, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animate);
}

// Interaction
window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
});

// Init
window.addEventListener('resize', () => {
    resize();
});

window.addEventListener('load', () => {
    resize();
    // Center mouse initially
    mx = width / 2;
    my = height / 2;
    animate();
});

// Immediate
resize();
mx = width / 2;
my = height / 2;
animate();

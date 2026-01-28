/**
 * Architectural Particle Constellation Animation
 * Perfect for horizontal banner format
 * Creates flowing geometric patterns
 */

(function () {
    const canvas = document.getElementById('architecture-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const CONFIG = {
        bgColor: '#2C2E81',
        particleColor: 'rgba(255, 255, 255, 0.6)',
        lineColor: 'rgba(255, 255, 255, 0.15)',
        accentColor: 'rgba(255, 255, 255, 0.8)',
        connectionDistance: 150,
        numParticles: 60
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = 1.5 + Math.random() * 2;
            this.connections = [];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Keep within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw() {
            // Outer glow
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();

            // Core particle
            ctx.fillStyle = CONFIG.particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        findConnections(particles) {
            this.connections = [];
            particles.forEach(other => {
                if (other !== this) {
                    const dx = this.x - other.x;
                    const dy = this.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONFIG.connectionDistance) {
                        this.connections.push({ particle: other, distance: dist });
                    }
                }
            });
        }

        drawConnections() {
            this.connections.forEach(conn => {
                const opacity = (1 - conn.distance / CONFIG.connectionDistance) * 0.3;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(conn.particle.x, conn.particle.y);
                ctx.stroke();
            });
        }
    }

    // Architectural dimension lines
    class DimensionLine {
        constructor() {
            this.y = 30 + Math.random() * (canvas.height - 60);
            this.startX = -200;
            this.length = 100 + Math.random() * 200;
            this.speed = 0.8 + Math.random() * 0.5;
            this.opacity = 0.2 + Math.random() * 0.3;
        }

        update() {
            this.startX += this.speed;
            if (this.startX > canvas.width + 200) {
                this.startX = -200;
                this.y = 30 + Math.random() * (canvas.height - 60);
                this.length = 100 + Math.random() * 200;
            }
        }

        draw() {
            const endX = this.startX + this.length;

            // Only draw if visible
            if (endX > 0 && this.startX < canvas.width) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.lineWidth = 1;
                ctx.setLineDash([8, 8]);

                // Main line
                ctx.beginPath();
                ctx.moveTo(this.startX, this.y);
                ctx.lineTo(endX, this.y);
                ctx.stroke();

                ctx.setLineDash([]);

                // End markers
                ctx.beginPath();
                ctx.moveTo(this.startX, this.y - 6);
                ctx.lineTo(this.startX, this.y + 6);
                ctx.moveTo(endX, this.y - 6);
                ctx.lineTo(endX, this.y + 6);
                ctx.stroke();

                // Measurement text (optional)
                if (Math.random() > 0.7) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
                    ctx.font = '10px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText(`${Math.floor(this.length)}mm`, (this.startX + endX) / 2, this.y - 10);
                }
            }
        }
    }

    // Pulsing geometric shapes
    class GeometricShape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 15 + Math.random() * 25;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.03;
            this.type = Math.floor(Math.random() * 3);
            this.opacity = 0.08 + Math.random() * 0.12;
        }

        update() {
            this.rotation += this.rotationSpeed;
            this.pulsePhase += this.pulseSpeed;
        }

        draw() {
            const pulse = Math.sin(this.pulsePhase) * 3;
            const size = this.size + pulse;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            if (this.type === 0) {
                // Square
                ctx.rect(-size / 2, -size / 2, size, size);
            } else if (this.type === 1) {
                // Circle
                ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
            } else {
                // Triangle
                ctx.moveTo(0, -size / 2);
                ctx.lineTo(size / 2, size / 2);
                ctx.lineTo(-size / 2, size / 2);
                ctx.closePath();
            }
            ctx.stroke();

            ctx.restore();
        }
    }

    // Initialize
    const particles = [];
    const dimensionLines = [];
    const shapes = [];

    for (let i = 0; i < CONFIG.numParticles; i++) {
        particles.push(new Particle());
    }

    for (let i = 0; i < 8; i++) {
        dimensionLines.push(new DimensionLine());
    }

    for (let i = 0; i < 12; i++) {
        shapes.push(new GeometricShape());
    }

    function drawGrid() {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 0.5;
        const spacing = 50;

        for (let x = 0; x < canvas.width; x += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y < canvas.height; y += spacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    function animate() {
        // Clear
        ctx.fillStyle = CONFIG.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        drawGrid();

        // Update and draw shapes
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });

        // Update and draw dimension lines
        dimensionLines.forEach(line => {
            line.update();
            line.draw();
        });

        // Update particles
        particles.forEach(p => p.update());

        // Find connections
        particles.forEach(p => p.findConnections(particles));

        // Draw connections first (behind particles)
        particles.forEach(p => p.drawConnections());

        // Draw particles
        particles.forEach(p => p.draw());

        requestAnimationFrame(animate);
    }

    animate();
})();

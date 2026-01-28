/**
 * Mesh Network Animation
 * Shows connected nodes with smooth wave motion.
 */

(function () {
    const canvas = document.getElementById('architecture-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Configuration
    const CONFIG = {
        bgColor: '#2C2E81',
        nodeColor: 'rgba(255, 255, 255, 0.6)',
        lineBaseColor: '255, 255, 255', // used for template strings
        gridX: 10, // Creates 11 column points
        gridY: 5,  // Creates 6 row points
        waveAmplitude: 15,
        horizontalAmplitude: 7.5,
        connectionDistance: 200,
        nodeSize: 3
    };

    let nodes = [];
    let time = 0;

    // --- Initialization ---

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        // canvas.width/height should match display size * pixel ratio for crispness
        // However, based on prompt "canvas.width = canvas.offsetWidth", we follow simple sizing 
        // or standard DPI handling. Let's use standard DPI for quality.
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Scale context
        ctx.scale(dpr, dpr);

        // Logical size for calculations
        canvas.logicalWidth = rect.width;
        canvas.logicalHeight = rect.height;

        initNodes();
    }

    function initNodes() {
        nodes = [];
        const width = canvas.logicalWidth;
        const height = canvas.logicalHeight;

        // Distribute nodes evenly
        // i goes from 0 to gridX (inclusive), j from 0 to gridY (inclusive)
        const stepX = width / CONFIG.gridX;
        const stepY = height / CONFIG.gridY;

        for (let i = 0; i <= CONFIG.gridX; i++) {
            for (let j = 0; j <= CONFIG.gridY; j++) {
                const x = i * stepX;
                const y = j * stepY;

                nodes.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    // Random phases for organic movement
                    phase: Math.random() * Math.PI * 2,
                    phaseX: Math.random() * Math.PI * 2
                });
            }
        }
    }

    // --- Animation Loop ---

    function animate() {
        // Update time
        time += 0.03;

        const width = canvas.logicalWidth;
        const height = canvas.logicalHeight;

        // 1. Clear Canvas
        ctx.fillStyle = CONFIG.bgColor;
        ctx.fillRect(0, 0, width, height);

        // 2. Update Node Positions
        nodes.forEach(node => {
            // Vertical wave
            node.y = node.baseY + Math.sin(time + node.phase) * CONFIG.waveAmplitude;
            // Horizontal wave
            node.x = node.baseX + Math.cos(time * 0.7 + node.phaseX) * CONFIG.horizontalAmplitude;
        });

        // 3. Draw Connections
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];

                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.connectionDistance) {
                    // Opacity calculation based on distance
                    // opacity = (1 - distance/200) * 0.3
                    const opacity = (1 - dist / CONFIG.connectionDistance) * 0.3;

                    ctx.strokeStyle = `rgba(${CONFIG.lineBaseColor}, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(nodeA.x, nodeA.y);
                    ctx.lineTo(nodeB.x, nodeB.y);
                    ctx.stroke();
                }
            }
        }

        // 4 & 5. Draw Nodes (Glow and Core)
        nodes.forEach(node => {
            // Outer Glow
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, CONFIG.nodeSize * 2, 0, Math.PI * 2);
            ctx.fill();

            // Inner Core
            ctx.fillStyle = CONFIG.nodeColor;
            ctx.beginPath();
            ctx.arc(node.x, node.y, CONFIG.nodeSize, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    // --- Start ---
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // This also triggers initNodes
    requestAnimationFrame(animate);

})();

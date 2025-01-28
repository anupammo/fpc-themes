
const canvas = document.getElementById('sunburstCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height * -0.2;
const rayCount = 12;
const rayLength = Math.max(canvas.width, canvas.height);

const colors = [
    'rgba(255, 165, 0, 0.6)',  // Orange
    'rgba(255, 140, 0, 0.6)',  // Dark Orange
    'rgba(255, 120, 0, 0.6)',  // Slightly Darker Orange
    'rgba(255, 100, 0, 0.6)',  // Deeper Orange
    'rgba(255, 80, 0, 0.6)',   // Even Deeper Orange
    'rgba(255, 60, 0, 0.6)',   // Almost Red-Orange
    'rgba(255, 204, 153, 0.6)', // Light Orange
    'rgba(255, 178, 102, 0.6)', // Peach
    'rgba(255, 153, 51, 0.6)', // Medium Orange
    'rgba(255, 128, 0, 0.6)',  // Deep Orange
    'rgba(255, 102, 0, 0.6)',  // Strong Orange
    'rgba(255, 77, 0, 0.6)',   // Red-Orange
    'rgba(255, 229, 204, 0.6)', // Very Light Orange
    'rgba(255, 217, 179, 0.6)', // Light Peach
    'rgba(255, 204, 153, 0.6)', // Pale Orange
    'rgba(255, 191, 128, 0.6)', // Soft Orange
    'rgba(255, 178, 102, 0.6)', // Fresh Peach
    'rgba(255, 165, 77, 0.6)',  // Warm Orange
    'rgba(255, 152, 51, 0.6)',  // Stronger Peach
    'rgba(255, 139, 25, 0.6)',  // Bright Orange
    'rgba(255, 126, 0, 0.6)',   // Vibrant Orange
    'rgba(255, 112, 0, 0.6)',   // Orange Red
    'rgba(255, 98, 0, 0.6)',    // Intense Orange
    'rgba(255, 84, 0, 0.6)'     // Deep Red Orange

    // 'rgba(255, 210, 127, 0.6)', 'rgba(255, 154, 127, 0.6)', 'rgba(255, 111, 97, 0.6)',
    // 'rgba(255, 179, 71, 0.6)', 'rgba(255, 195, 0, 0.6)', 'rgba(244, 208, 63, 0.6)',
    // 'rgba(243, 156, 18, 0.6)', 'rgba(235, 152, 78, 0.6)', 'rgba(220, 118, 51, 0.6)',
    // 'rgba(165, 105, 189, 0.6)', 'rgba(142, 68, 173, 0.6)', 'rgba(93, 173, 226, 0.6)',
    // 'rgba(52, 152, 219, 0.6)', 'rgba(26, 188, 156, 0.6)', 'rgba(22, 160, 133, 0.6)',
    // 'rgba(39, 174, 96, 0.6)', 'rgba(46, 204, 113, 0.6)', 'rgba(241, 196, 15, 0.6)',
    // 'rgba(230, 126, 34, 0.6)', 'rgba(231, 76, 60, 0.6)', 'rgba(192, 57, 43, 0.6)',
    // 'rgba(236, 112, 99, 0.6)', 'rgba(175, 122, 197, 0.6)', 'rgba(84, 153, 199, 0.6)',
    // 'rgba(93, 109, 126, 0.6)'
];

let time = 0;
let mouseX = 0;

function drawBackground() {
    const backgroundGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    backgroundGradient.addColorStop(0, 'rgba(255, 165, 0, 0.6)');    // Orange
    backgroundGradient.addColorStop(0.2, 'rgba(255, 140, 0, 0.6)');  // Dark Orange
    backgroundGradient.addColorStop(0.4, 'rgba(255, 120, 0, 0.6)');  // Slightly Darker Orange
    backgroundGradient.addColorStop(0.6, 'rgba(255, 100, 0, 0.6)');  // Deeper Orange
    backgroundGradient.addColorStop(0.8, 'rgba(255, 80, 0, 0.4)');   // Even Deeper Orange
    backgroundGradient.addColorStop(1, 'rgba(255, 60, 0, 0.3)');     // Almost Red-Orange

    // backgroundGradient.addColorStop(0, 'rgba(255, 210, 127, 0.6)');
    // backgroundGradient.addColorStop(0.2, 'rgba(255, 154, 127, 0.6)');
    // backgroundGradient.addColorStop(0.4, 'rgba(255, 111, 97, 0.6)');
    // backgroundGradient.addColorStop(0.6, 'rgba(255, 179, 71, 0.6)');
    // backgroundGradient.addColorStop(0.8, 'rgba(244, 208, 63, 0.4)');
    // backgroundGradient.addColorStop(1, 'rgba(52, 152, 219, 0.3)');
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRays() {
    const rayWidth = Math.PI * 2 / rayCount;
    for (let i = 0; i < rayCount; i++) {
        const angle = i * rayWidth + Math.sin(time + i) * 0.1 + (mouseX / canvas.width) * 2 * Math.PI;
        const color = colors[i % colors.length];

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);

        const rayGradient = ctx.createLinearGradient(0, 0, rayLength, 0);
        rayGradient.addColorStop(0, color);
        rayGradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

        ctx.fillStyle = rayGradient;
        ctx.beginPath();
        ctx.moveTo(0, -canvas.height);
        ctx.lineTo(rayLength, 0);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

function animate() {
    time += 0.05;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawRays();
    requestAnimationFrame(animate);
}

drawBackground();
drawRays();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();
});

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
});
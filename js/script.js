
const canvas = document.getElementById('sunburstCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height * -0.2;
const rayCount = 12;
const rayLength = Math.max(canvas.width, canvas.height);

const colors = [
    'rgba(255, 210, 127, 0.6)', 'rgba(255, 154, 127, 0.6)', 'rgba(255, 111, 97, 0.6)',
    'rgba(255, 179, 71, 0.6)', 'rgba(255, 195, 0, 0.6)', 'rgba(244, 208, 63, 0.6)',
    'rgba(243, 156, 18, 0.6)', 'rgba(235, 152, 78, 0.6)', 'rgba(220, 118, 51, 0.6)',
    'rgba(165, 105, 189, 0.6)', 'rgba(142, 68, 173, 0.6)', 'rgba(93, 173, 226, 0.6)',
    'rgba(52, 152, 219, 0.6)', 'rgba(26, 188, 156, 0.6)', 'rgba(22, 160, 133, 0.6)',
    'rgba(39, 174, 96, 0.6)', 'rgba(46, 204, 113, 0.6)', 'rgba(241, 196, 15, 0.6)',
    'rgba(230, 126, 34, 0.6)', 'rgba(231, 76, 60, 0.6)', 'rgba(192, 57, 43, 0.6)',
    'rgba(236, 112, 99, 0.6)', 'rgba(175, 122, 197, 0.6)', 'rgba(84, 153, 199, 0.6)',
    'rgba(93, 109, 126, 0.6)'
];

let time = 0;
let mouseX = 0;

function drawBackground() {
    const backgroundGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    backgroundGradient.addColorStop(0, 'rgba(255, 210, 127, 0.6)');
    backgroundGradient.addColorStop(0.2, 'rgba(255, 154, 127, 0.6)');
    backgroundGradient.addColorStop(0.4, 'rgba(255, 111, 97, 0.6)');
    backgroundGradient.addColorStop(0.6, 'rgba(255, 179, 71, 0.6)');
    backgroundGradient.addColorStop(0.8, 'rgba(244, 208, 63, 0.4)');
    backgroundGradient.addColorStop(1, 'rgba(52, 152, 219, 0.3)');
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
    time += 0.01;
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
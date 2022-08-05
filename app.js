/**@type {HTMLCanvasElement}*/
const ctx = cnv.getContext("2d");
cnv.width = innerWidth;
cnv.height = innerHeight;

let mouse = { x: cnv.width / 2, y: cnv.height / 2 }
addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})
addEventListener('resize', () => {
    cnv.width = innerWidth;
    cnv.height = innerHeight;
});
function ranRang(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)
}
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.vl = 0.05;
        this.sprid = ranRang(50, 120);
        this.lastLocation = { x: x, y: y };
        this.update = () => {
            const lastPsition = { x: this.x, y: this.y };
            this.lastLocation.x += (mouse.x - this.lastLocation.x) * 0.05;
            this.lastLocation.y += (mouse.y - this.lastLocation.y) * 0.05;
            this.radians += this.vl;
            this.x = this.lastLocation.x + Math.cos(this.radians) * this.sprid;
            this.y = this.lastLocation.y + Math.sin(this.radians) * this.sprid;
            this.draw(lastPsition);
        };
        this.draw = (lastPsition) => {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.radius;
            ctx.moveTo(lastPsition.x, lastPsition.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.closePath();
        };
    }
};
let particles;
function init() {
    particles = []
    for (let i = 0; i < 100; i++) {
        let color = `hsl(${Math.random() * 360},75%, 50%)`;
        const radius = (Math.random() * 3) + 1.5
        particles.push(new Particle(cnv.width / 2, cnv.height / 2, radius, color))
    }
}
function animate() {
    // ctx.fillStyle = `rgba(255, 255, 255, 0.07)`;
    ctx.fillStyle = `rgba(0, 0, 0, 0.07)`;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    particles.forEach(particle => {
        particle.update()
    });
    requestAnimationFrame(animate)
}
init();
animate();
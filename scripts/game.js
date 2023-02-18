const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// const particleCountDisplay = document.getElementById("particle-count");

// Set the canvas to the size of the viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the number of particles
const particleCount = 100;
const mouseGravityRadius = 130;

var particles_count;

// Define an array to store the particles
const particles = [];

// Define a class for the particles
class Particle {
  constructor() {
    // Give the particle a random initial position
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  
    // Give the particle a random initial velocity
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;

    // Keep track of the particle's past positions
    this.trace  = [];

    // Set the initial color to blue
    this.color = "#00fff9";
  }

  // Method to update the particle's position
  update() {
  // Update the particle's position based on its velocity
  this.x += this.vx;
  this.y += this.vy;

  // Check if the particle hits the edge of the canvas
  if (this.x < 0 || this.x > canvas.width) {
    this.vx = -this.vx;
  }
  if (this.y < 0 || this.y > canvas.height) {
    this.vy = -this.vy;
  }

  // Check if the mouse is close to the particle
  const dx = this.x - mouseX;
  const dy = this.y - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < mouseGravityRadius) {
    const gravity = 0.01;
    const forceX = (mouseX - this.x) * gravity;
    const forceY = (mouseY - this.y) * gravity;

    this.vx += forceX;
    this.vy += forceY;

    // Decrease the velocity of the particle over time
    this.vx *= 0.999;
    this.vy *= 0.999;

    this.color = "#ff00c1";

    // Draw the past positions of the particle as a fading trace
    const traceLength = 3;
    for (let i = 0; i < traceLength; i = i+0.1) {
      const alpha = (i + 1) / traceLength;
      ctx.beginPath();
      ctx.arc(this.x - this.vx * i, this.y - this.vy * i, 2, 0, 1 * Math.PI);
      ctx.arc(this.x - this.vx * i, this.y - this.vy * i, this.size + 2, 0, Math.PI * 1, false);
      ctx.fillStyle = `hsla(311, 70%, 50%, ${alpha})`;
      ctx.fill();
    }
    // particles_count++;
  } else {
    this.color = "#00fff9";
    // particles_count--;
  }

  // Draw the particle on the canvas
  ctx.beginPath();
  ctx.arc(this.x, this.y, 2, 0, 1 * Math.PI);
  ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();


  // Decrease the timer
  this.timer--;

  // If the timer reaches 0, remove the particle
  if (this.timer <= 0) {
    const index = particles.indexOf(this);
    particles.splice(index, 1);
  }
  // Update the particle count display
  // particleCountDisplay.text = particles_count;
  // console.log(particles_count)
}
}

// Initialize the particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Get the mouse position
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Animate the particles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particles) {
    particle.update();
  }
}

animate();
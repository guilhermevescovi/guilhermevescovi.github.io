import React, { useEffect, useRef } from 'react';
import './ParticleCanvas.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  const PARTICLE_COUNT = 100;
  const MOUSE_GRAVITY_RADIUS = 130;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 10 - 5,
          vy: Math.random() * 10 - 5,
          color: '#00fff9',
        });
      }
    };

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    // Update particle
    const updateParticle = (particle: Particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off walls
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx = -particle.vx;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy = -particle.vy;
      }

      // Mouse interaction
      const dx = particle.x - mouseRef.current.x;
      const dy = particle.y - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUSE_GRAVITY_RADIUS) {
        const gravity = 0.01;
        const forceX = (mouseRef.current.x - particle.x) * gravity;
        const forceY = (mouseRef.current.y - particle.y) * gravity;

        particle.vx += forceX;
        particle.vy += forceY;

        // Damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        particle.color = '#ff00c1';

        // Draw trace
        const traceLength = 3;
        for (let i = 0; i < traceLength; i += 0.1) {
          const alpha = (i + 1) / traceLength;
          ctx.beginPath();
          ctx.arc(particle.x - particle.vx * i, particle.y - particle.vy * i, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(311, 70%, 50%, ${alpha})`;
          ctx.fill();
        }
      } else {
        particle.color = '#00fff9';
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(updateParticle);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize and start
    initializeParticles();
    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas"></canvas>;
};

export default ParticleCanvas;

import React, { useEffect, useRef } from 'react';

const Particles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Generate slow-moving floating dust particles
        const particles: {x: number, y: number, radius: number, vx: number, vy: number, baseOpacity: number}[] = [];
        const numParticles = Math.floor((width * height) / 10000); 

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2 + 0.5,
                    vx: (Math.random() - 0.5) * 0.15, // incredibly slow drifting
                    vy: (Math.random() - 0.5) * 0.15 - 0.1, // slight upward drift bias
                    baseOpacity: Math.random() * 0.4 + 0.05
                });
            }
        };
        initParticles();

        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                // Interactive physics
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distance = Math.hypot(dx, dy);

                let currentOpacity = p.baseOpacity;

                if (distance < 150) {
                    // Repel slightly away from mouse
                    const force = (150 - distance) / 150;
                    p.x += (dx / distance) * force * 1.5;
                    p.y += (dy / distance) * force * 1.5;
                    
                    // Illuminate slightly when near mouse
                    currentOpacity = Math.min(1, p.baseOpacity + force * 0.5);

                    // Draw extremely faint connecting line to mouse
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(56, 189, 248, ${force * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                p.x += p.vx;
                p.y += p.vy;

                // Seamlessly wrap around screen edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${currentOpacity})`; // Soft cyan
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -2, pointerEvents: 'none' }} />;
};

export default Particles;

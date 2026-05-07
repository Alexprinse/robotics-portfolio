import React, { useEffect, useState } from 'react';
import Hero3D from './Hero3D';

const TYPEWRITER_TEXTS = [
    "HELLO, I'M SHALEM.",
    "ROBOTICS ENGINEER.",
    "AI & AUTONOMOUS SYSTEMS."
];

const Hero: React.FC = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentString = TYPEWRITER_TEXTS[index];
        let timeout: ReturnType<typeof setTimeout>;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setText(currentString.substring(0, charIndex - 1));
                setCharIndex(c => c - 1);
            }, 50);
        } else {
            timeout = setTimeout(() => {
                setText(currentString.substring(0, charIndex + 1));
                setCharIndex(c => c + 1);
            }, 100);
        }

        if (!isDeleting && charIndex === currentString.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setIndex((index + 1) % TYPEWRITER_TEXTS.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, index]);

    return (
        <section id="hero" className="visible">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="system-badge">
                        <div className="pulse-dot"></div>
                        SYSTEMS ONLINE
                    </div>
                    <div className="typewriter" id="typewriter-text">
                        {text}<span className="cursor"></span>
                    </div>
                    <div className="cta-group">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn">Initialize Contact</a>
                        <a href="/resume.pdf" target="_blank" className="btn" style={{ borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}>[FIRMWARE.PDF]</a>
                    </div>
                </div>
                <div className="hero-3d" id="hero-3d">
                    <Hero3D />
                </div>
            </div>
        </section>
    );
};

export default Hero;

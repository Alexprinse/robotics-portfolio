import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
// import Gallery from './components/Gallery';
import Awards from './components/Awards';
import BootScreen from './components/BootScreen';
import Particles from './components/Particles';
import StatusBar from './components/StatusBar';

// Code split the heavy 3D / graph components
const Arm3D = lazy(() => import('./components/Arm3D'));
const Contact = lazy(() => import('./components/Contact'));

const SECTION_IDS = ['about', 'experience', 'awards', 'skills', 'projects', 'arm', 'contact'];

const CursorGlow: React.FC = () => {
    const glowRef = React.useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
            }
        };
        window.addEventListener('mousemove', move, { passive: true });
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return <div className="cursor-glow" ref={glowRef} />;
};

const App: React.FC = () => {
    const [isBooting, setIsBooting] = useState(true);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (isBooting) return;

        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.08 });

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' }); // triggers when section is roughly centered in viewport

        const observedSections = new Set<Element>();

        const attachToSections = () => {
            document.querySelectorAll('section').forEach(section => {
                if (!observedSections.has(section)) {
                    animObserver.observe(section);
                    navObserver.observe(section);
                    observedSections.add(section);
                }
            });
        };

        // Observe existing sections immediately
        attachToSections();

        // Watch for lazy-loaded sections appearing in the DOM
        const mutationObserver = new MutationObserver(attachToSections);
        mutationObserver.observe(document.querySelector('main') ?? document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            animObserver.disconnect();
            navObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [isBooting]);

    if (isBooting) {
        return <BootScreen onComplete={() => setIsBooting(false)} />;
    }

    return (
        <>
            <CursorGlow />
            <div className="circuit-bg"></div>
            <div className="scanlines"></div>
            <Particles />

            <Navbar activeSection={activeSection} sectionIds={SECTION_IDS} />

            <main>
                <Hero />
                <About />
                <Experience />
                <Awards />
                <Skills />
                <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
                    <Projects />
                    {/* <Gallery /> */}
                    <Arm3D />
                    <Contact />
                </Suspense>
            </main>

            <StatusBar />
        </>
    );
};

export default App;


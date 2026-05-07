import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
    label: string;
    sublabel: string;
    tag: string;
    accent: string;
    img?: string; // drop real photo path here later
}

const SLIDES: Slide[] = [
    {
        label: 'B3RB Autonomous Rover',
        sublabel: 'NXP AIM Competition — LiDAR SLAM Navigation',
        tag: 'ROVER / HARDWARE',
        accent: '#38bdf8',
    },
    {
        label: 'eBot Mobile Base',
        sublabel: 'Krishi coBot — ROS2 Nav2 Stack',
        tag: 'MOBILE BASE / ROS2',
        accent: '#22c55e',
    },
    {
        label: 'UR5 Robotic Arm',
        sublabel: 'Krishi coBot — MoveIt Pick & Place',
        tag: 'MANIPULATOR / MOVEIT',
        accent: '#a78bfa',
    },
    {
        label: 'Warehouse Simulation',
        sublabel: 'Logistic coBot — Gazebo Multi-Agent',
        tag: 'SIMULATION / GAZEBO',
        accent: '#f59e0b',
    },
    {
        label: 'Arena World 1',
        sublabel: 'NXP AIM — Obstacle Navigation',
        tag: 'COMPETITION / NXP',
        accent: '#38bdf8',
    },
    {
        label: 'Sensor Integration',
        sublabel: 'LiDAR + Camera — Sensor Fusion Setup',
        tag: 'HARDWARE / SENSORS',
        accent: '#22c55e',
    },
];

const Placeholder: React.FC<{ slide: Slide }> = ({ slide }) => (
    <div
        className="gallery-placeholder"
        style={{
            background: `radial-gradient(ellipse at 30% 40%, ${slide.accent}18 0%, #0a0d14 70%)`,
            borderColor: `${slide.accent}33`,
        }}
    >
        {/* grid overlay */}
        <div className="gallery-grid-overlay" />

        {/* corner brackets */}
        <div className="gallery-corner tl" style={{ borderColor: slide.accent }} />
        <div className="gallery-corner tr" style={{ borderColor: slide.accent }} />
        <div className="gallery-corner bl" style={{ borderColor: slide.accent }} />
        <div className="gallery-corner br" style={{ borderColor: slide.accent }} />

        {/* centre icon */}
        <div className="gallery-icon" style={{ color: slide.accent }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>
                [ PHOTO PLACEHOLDER ]
            </span>
        </div>

        {/* caption bar */}
        <div className="gallery-caption" style={{ borderTopColor: `${slide.accent}33` }}>
            <div>
                <div className="gallery-caption-label">{slide.label}</div>
                <div className="gallery-caption-sub">{slide.sublabel}</div>
            </div>
            <span className="gallery-tag" style={{ borderColor: `${slide.accent}55`, color: slide.accent }}>
                {slide.tag}
            </span>
        </div>
    </div>
);

const Gallery: React.FC = () => {
    const [active, setActive] = useState(0);
    const total = SLIDES.length;

    const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total]);
    const next = useCallback(() => setActive(a => (a + 1) % total), [total]);

    // keyboard nav
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    // auto-advance every 5 s
    useEffect(() => {
        const t = setTimeout(next, 5000);
        return () => clearTimeout(t);
    }, [active, next]);

    return (
        <section id="gallery">
            <h2 className="section-title">Hardware_Lab()</h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#444', marginTop: '-1.8rem', marginBottom: '2.5rem' }}>
                // physical builds &amp; competition setups — replace placeholders with real photos
            </p>

            <div className="carousel-wrapper">
                {/* ── Main slide ── */}
                <div className="carousel-stage">
                    <Placeholder slide={SLIDES[active]} />

                    {/* Prev / Next */}
                    <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous">&#8592;</button>
                    <button className="carousel-btn carousel-next" onClick={next} aria-label="Next">&#8594;</button>

                    {/* Slide counter */}
                    <div className="carousel-counter">
                        {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </div>
                </div>

                {/* ── Thumbnail strip ── */}
                <div className="carousel-thumbs">
                    {SLIDES.map((s, i) => (
                        <button
                            key={i}
                            className={`carousel-thumb ${i === active ? 'active' : ''}`}
                            onClick={() => setActive(i)}
                            style={{ borderColor: i === active ? s.accent : undefined }}
                            aria-label={s.label}
                        >
                            <div
                                className="thumb-inner"
                                style={{ background: `radial-gradient(ellipse, ${s.accent}25 0%, #0a0d14 100%)` }}
                            >
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: s.accent, opacity: 0.7 }}>
                                    {s.tag.split('/')[0].trim()}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* ── Dot indicators ── */}
                <div className="carousel-dots">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`carousel-dot ${i === active ? 'active' : ''}`}
                            onClick={() => setActive(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;

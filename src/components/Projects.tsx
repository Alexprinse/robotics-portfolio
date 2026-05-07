import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Demo { label: string; url: string; }

interface Project {
    title: string;
    summary: string;
    fullDesc: string;
    outcome: string;
    tags: string[];
    github?: string;
    demos?: Demo[];
    award?: string;
}

const toEmbed = (url: string) => {
    const id = url.split('/').pop()?.split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
};

const PROJECTS: Project[] = [
    {
        title: "Logistic Cobot",
        summary: "Autonomous multi-agent warehouse system simulated in Gazebo/ROS2 with Nav2 and MoveIt.",
        fullDesc: `Built a multi-robot warehouse automation system in Gazebo/ROS2 simulating real-world cobot logistics.

What I built:
• Centralized task dispatcher in Python that assigns picking/delivery jobs to idle robots
• Nav2 DWA planner for real-time path planning around moving obstacles and other robots
• MoveIt arm trajectory planning at pickup stations with custom URDF end effectors
• Full Gazebo + RViz simulation with sensor feedback and collision checking`,
        outcome: "Achieved collision-free multi-robot coordination in a 10×10m simulated warehouse.",
        tags: ["ROS2", "Nav2", "MoveIt", "Gazebo", "Python", "RViz", "URDF"],
        github: "https://github.com/princebadampudi",
        demos: [{ label: "Full Demo", url: "https://youtu.be/6sjVKjVlwoo" }],
    },
    {
        title: "Autonomous Warehouse Rover",
        summary: "NXP AIM 3rd Prize. Physical B3RB rover with ROS2 navigation, LiDAR SLAM, and computer vision.",
        fullDesc: `Deployed a full autonomous navigation system on a physical B3RB rover for the NXP AIM competition — competing across 3 distinct arena worlds.

What I implemented:
• LiDAR SLAM (slam_toolbox) for real-time mapping and localization on a physical platform
• Nav2 stack fine-tuned for tight indoor spaces with dynamic obstacle replanning
• OpenCV detection pipeline to identify and classify competition task objects
• Diagnosed and resolved B3RB firmware ↔ ROS2 communication bottlenecks that caused ~40% control latency

Each world had unique obstacle layouts, forcing rapid parameter re-tuning between runs.`,
        outcome: "Resolved firmware-to-software bottlenecks, reducing communication latency by ~40%.",
        tags: ["ROS2", "LiDAR", "SLAM", "OpenCV", "Nav2", "Hardware", "B3RB"],
        github: "https://github.com/princebadampudi",
        award: "🥉 NXP AIM 3rd Prize",
        demos: [
            { label: "World 1", url: "https://youtu.be/IgXwKIQvcNU" },
            { label: "World 2", url: "https://youtu.be/nbKGHeC5JjA" },
            { label: "World 3", url: "https://youtu.be/IPeLoa-Vzlg" },
        ],
    },
    {
        title: "Krishi coBot",
        summary: "e-YRC 2025-26 1st Place. Precision agriculture mobile manipulator with UR5 arm and fruit detection.",
        fullDesc: `National 1st place — e-Yantra Robotics Competition 2025-26. Built an end-to-end autonomous agricultural robot that picks ripe fruit without any human intervention.

System architecture:
• eBot mobile base with full Nav2 stack, tuned for structured outdoor row navigation
• UR5 arm controlled via MoveIt for precision pick-and-place at detected fruit locations
• OpenCV + classification pipeline achieving 94%+ ripeness detection accuracy
• Custom Python waypoint navigator for systematic orchard row traversal

The robot navigated rows, identified ripe fruit, grasped it with the UR5, and deposited it into a bin — fully autonomous, start to finish.`,
        outcome: "Delivered end-to-end autonomous pick-and-place with 94%+ detection accuracy.",
        tags: ["ROS2", "UR5", "OpenCV", "Python", "Nav2", "MoveIt", "eBot"],
        github: "https://github.com/princebadampudi",
        award: "🥇 e-YRC 2025-26 1st Place",
        demos: [{ label: "Full Demo", url: "https://youtu.be/3wW87UkGx3k" }],
    },
];



const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    const [activeIdx, setActiveIdx] = useState(0);

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div className="modal-header-left">
                        {project.award && <span className="award-badge">{project.award}</span>}
                        <h2 className="modal-title">{project.title}</h2>
                    </div>
                    <button className="drawer-close" onClick={onClose}>✕</button>
                </div>

                {/* Body: two columns on desktop */}
                <div className="modal-body">
                    {/* LEFT — Info */}
                    <div className="modal-info">
                        <div className="modal-section">
                            <span className="drawer-section-label">// overview</span>
                            <p className="drawer-desc">{project.fullDesc}</p>
                        </div>

                        <div className="modal-outcome">
                            <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>▶ RESULT</span>
                            <p style={{ marginTop: '0.4rem', color: '#ccc', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', lineHeight: 1.6 }}>{project.outcome}</p>
                        </div>

                        <div className="modal-section">
                            <span className="drawer-section-label">// tech stack</span>
                            <div className="project-tags" style={{ gap: '0.5rem', marginTop: '0.2rem' }}>
                                {project.tags.map((tag, i) => <span key={i} className="project-tag">{tag}</span>)}
                            </div>
                        </div>

                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" style={{ display: 'inline-flex', marginTop: '0.5rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                View on GitHub
                            </a>
                        )}
                    </div>

                    {/* RIGHT — Video player */}
                    {project.demos && project.demos.length > 0 && (
                        <div className="modal-video-panel">
                            <span className="drawer-section-label">// demo videos</span>
                            {/* Tab buttons for multiple videos */}
                            {project.demos.length > 1 && (
                                <div className="video-tabs">
                                    {project.demos.map((d, i) => (
                                        <button
                                            key={i}
                                            className={`video-tab-btn ${activeIdx === i ? 'active' : ''}`}
                                            onClick={() => setActiveIdx(i)}
                                        >
                                            ▶ {d.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className="modal-iframe-wrapper">
                                <iframe
                                    key={activeIdx}
                                    src={toEmbed(project.demos[activeIdx].url)}
                                    title={project.demos[activeIdx].label}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

const Projects: React.FC = () => {
    const [selected, setSelected] = useState<Project | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = selected ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selected]);

    return (
        <section id="projects">
            <h2 className="section-title">Load_Modules()</h2>
            <p style={{ color: '#444', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginBottom: '2rem', marginTop: '-2rem' }}>
                // click any card to view details + demo
            </p>

            <div className="projects-grid">
                {PROJECTS.map((project, index) => (
                    <div className="project-card hud-bracket" key={index} onClick={() => setSelected(project)} style={{ cursor: 'pointer' }}>
                        <div className="project-card-top">
                            {project.award && <span className="award-badge">{project.award}</span>}
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.summary}</p>
                            <p className="project-outcome">
                                <span style={{ color: 'var(--accent-green)' }}>▶ </span>{project.outcome}
                            </p>
                        </div>
                        <div className="project-card-bottom">
                            <div className="project-tags">
                                {project.tags.slice(0, 5).map((tag, i) => <span key={i} className="project-tag">{tag}</span>)}
                                {project.tags.length > 5 && <span className="project-tag" style={{ opacity: 0.5 }}>+{project.tags.length - 5}</span>}
                            </div>
                            <div className="card-expand-hint">
                                {project.demos && project.demos.length > 0 && <span>▶ {project.demos.length} video{project.demos.length > 1 ? 's' : ''}</span>}
                                <span>click to open ↗</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </section>
    );
};

export default Projects;

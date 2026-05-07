import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="visible">
            <h2 className="section-title">Whoami()</h2>
            <div className="about-grid">
                <div className="bio-text hud-bracket" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>SHALEM BAKTH SINGH BADAMPUDI</p>
                    <p>Robotics Engineer specializing in ROS2-based autonomous systems, SLAM, and hardware–software integration.</p>
                    <p>Experienced in deploying real-world robotic platforms under competition-grade constraints, including navigation, perception, and manipulation using LiDAR, UR5, and Nav2.</p>
                </div>

                <div className="stats-panel">
                    <div className="stat-item hud-bracket">
                        <div className="stat-value" style={{ fontSize: '1.8rem' }}>B.Tech ECE</div>
                        <div className="stat-label">RGUKT (Expected 2026)</div>
                    </div>
                    <div className="stat-item hud-bracket">
                        <div className="stat-value">8.1</div>
                        <div className="stat-label">CGPA</div>
                    </div>
                    <div className="stat-item hud-bracket">
                        <div className="stat-value">1st Place</div>
                        <div className="stat-label">e-YRC Krishi coBot</div>
                    </div>
                    <div className="stat-item hud-bracket">
                        <div className="stat-value">3rd Prize</div>
                        <div className="stat-label">NXP AIM Robotics 2025</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

import React from 'react';

const Experience: React.FC = () => {
    return (
        <section id="experience" className="visible">
            <h2 className="section-title">Execution_Log()</h2>
            <div className="experience-container">
                <div className="timeline">
                    {/* Item 1 */}
                    <div className="timeline-item hud-bracket">
                        <div className="timeline-date" style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>May 2025 - Aug 2025</div>
                        <h3 className="timeline-role" style={{ color: 'var(--accent-green)', marginBottom: '0.5rem' }}>Machine Learning Intern</h3>
                        <h4 className="timeline-company" style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>IIIT Kottayam</h4>
                        <ul className="timeline-desc" style={{ color: '#ccc', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Explored and implemented advanced Explainable AI (XAI) and fairness techniques for prediction trustworthiness.</li>
                            <li>Integrated interpretability tools including LIME, Saliency Maps, and Grad-CAM while conducting bias mitigation via LRP and Integrated Gradients (IG) to deliver verifiable and ethical AI solutions.</li>
                        </ul>
                    </div>

                    {/* Item 2 */}
                    <div className="timeline-item hud-bracket">
                        <div className="timeline-date" style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Oct 2024 - Dec 2024</div>
                        <h3 className="timeline-role" style={{ color: 'var(--accent-green)', marginBottom: '0.5rem' }}>Artificial Intelligence Intern</h3>
                        <h4 className="timeline-company" style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>Infosys Springboard</h4>
                        <ul className="timeline-desc" style={{ color: '#ccc', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Contributed to a Computer Vision project, gaining hands-on experience across the entire AI model development lifecycle.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Fine-tuned pre-trained CNN architectures, achieving high accuracy for the task.</li>
                            <li>Demonstrated proficiency in model training, validation, and data pre-processing within a team environment.</li>
                        </ul>
                    </div>
                    
                    {/* Item 3 */}
                    <div className="timeline-item hud-bracket">
                        <div className="timeline-date" style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>2024 - Present</div>
                        <h3 className="timeline-role" style={{ color: 'var(--accent-green)', marginBottom: '0.5rem' }}>Robotics Team Lead</h3>
                        <h4 className="timeline-company" style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>e-Yantra & NXP AIM Competitions</h4>
                        <ul className="timeline-desc" style={{ color: '#ccc', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Led multiple robotics competition teams, managing end-to-end planning, design, and implementation.</li>
                            <li>Delivered full ROS2 autonomy stacks combining SLAM, hardware integration, and perception, resulting in 1st Place (e-YRC) and 3rd Prize (NXP AIM) finishes.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

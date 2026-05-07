import React, { useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SkillCard: React.FC<{ title: string, skills: string[] }> = ({ title, skills }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div ref={cardRef} className="premium-skill-card" onMouseMove={handleMouseMove}>
            <div className="card-content">
                <h3 className="category-title">&gt; {title}</h3>
                <div className="tags-container">
                    {skills.map((s, i) => <span key={i} className="premium-tag">{s}</span>)}
                </div>
            </div>
        </div>
    );
};

const Skills: React.FC = () => {
    const skillData = [
        { subject: 'Robotics (ROS2/SLAM)', A: 95, fullMark: 100 },
        { subject: 'AI & ML', A: 85, fullMark: 100 },
        { subject: 'Programming (C++/Python)', A: 90, fullMark: 100 },
        { subject: 'Hardware Integration', A: 85, fullMark: 100 },
        { subject: 'Web Dev (React)', A: 75, fullMark: 100 },
        { subject: 'Computer Vision', A: 88, fullMark: 100 },
    ];

    const categories = [
        { title: "AUTONOMY_CORE", skills: ["ROS2", "Nav2", "SLAM", "MoveIt", "Gazebo", "Micro-ROS"] },
        { title: "VISION_&_AI", skills: ["Python", "OpenCV", "TensorFlow", "Machine Learning", "Deep Learning", "NLP"] },
        { title: "HARDWARE_I/O", skills: ["UR5 Arm", "LiDAR", "C++", "Embedded C", "Sensors"] },
        { title: "SYSTEMS_&_WEB", skills: ["Linux", "Git", "React", "TypeScript", "JavaScript", "SQL"] }
    ];

    return (
        <section id="skills" className="visible" style={{ minHeight: 'auto', paddingTop: '100px' }}>
            <h2 className="section-title">Analyze_Subroutines()</h2>
            <div className="skills-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '0', alignItems: 'flex-start' }}>
                
                {/* Radar Chart side */}
                <div className="radar-chart-wrapper" style={{ width: '100%', height: '500px', background: 'rgba(10,13,20,0.5)', borderRadius: '12px', border: '1px solid var(--hud-border)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>[PERFORMANCE_MATRIX]</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skillData}>
                            <PolarGrid stroke="rgba(56, 189, 248, 0.2)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#38bdf8', fontSize: 11, fontFamily: 'var(--font-mono)' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Proficiency" dataKey="A" stroke="#22c55e" strokeWidth={2} fill="#22c55e" fillOpacity={0.3} />
                            <Tooltip contentStyle={{ backgroundColor: '#0a0d14', border: '1px solid #38bdf8', fontFamily: 'var(--font-mono)' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Spotlight Cards Side */}
                <div className="skills-modules-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {categories.map((cat, i) => (
                        <SkillCard key={i} title={cat.title} skills={cat.skills} />
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default Skills;

import React from 'react';

interface Award {
    emoji: string;
    rank: string;
    title: string;
    org: string;
    year: string;
    desc: string;
    accent: string;
}

const AWARDS: Award[] = [
    {
        emoji: '🥇',
        rank: '1st Place — National',
        title: 'e-Yantra Robotics Competition',
        org: 'IIT Bombay · e-YRC 2025-26',
        year: '2026',
        desc: 'Krishi coBot theme — autonomous agricultural robot with UR5 arm, Nav2 navigation, and 94%+ fruit detection accuracy. Competed against 500+ teams nationally.',
        accent: '#f59e0b',
    },
    {
        emoji: '🥉',
        rank: '3rd Prize — National',
        title: 'NXP AIM Autonomous Robotics',
        org: 'NXP Semiconductors · AIM 2025',
        year: '2025',
        desc: 'Deployed ROS2 navigation stack on a physical B3RB rover across 3 arena worlds. Resolved firmware–software communication bottlenecks reducing latency by ~40%.',
        accent: '#38bdf8',
    },
];

const Awards: React.FC = () => (
    <section id="awards">
        <h2 className="section-title">Achievements()</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#444', marginTop: '-1.8rem', marginBottom: '2.5rem' }}>
            // competition results &amp; recognition
        </p>

        <div className="awards-grid">
            {AWARDS.map((a, i) => (
                <div
                    key={i}
                    className="award-card hud-bracket"
                    style={{ borderColor: `${a.accent}40` }}
                >
                    {/* Accent line */}
                    <div className="award-accent-bar" style={{ background: a.accent }} />

                    <div className="award-top">
                        <span className="award-emoji">{a.emoji}</span>
                        <div>
                            <div className="award-rank" style={{ color: a.accent }}>{a.rank}</div>
                            <div className="award-title">{a.title}</div>
                            <div className="award-org">{a.org}</div>
                        </div>
                        <div className="award-year" style={{ borderColor: `${a.accent}40`, color: a.accent }}>
                            {a.year}
                        </div>
                    </div>

                    <p className="award-desc">{a.desc}</p>

                    <div className="award-badge-row">
                        <span className="award-status-dot" style={{ background: a.accent }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: a.accent }}>
                            VERIFIED ACHIEVEMENT
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Awards;

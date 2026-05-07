import React, { useState } from 'react';

interface NavbarProps {
    activeSection: string;
    sectionIds: string[];
}

const NAV_LABELS: Record<string, string> = {
    about: 'About',
    experience: 'Experience',
    awards: 'Awards',
    skills: 'Skills',
    projects: 'Projects',
    arm: '3D Arm',
    contact: 'Contact',
};

const Navbar: React.FC<NavbarProps> = ({ activeSection, sectionIds }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav>
            <a href="#" className="logo glow-text">[ROBO.DEV]</a>

            <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                <span /><span /><span />
            </button>

            <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
                {sectionIds.map(id => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={activeSection === id ? 'nav-active' : ''}
                        onClick={closeMenu}
                    >
                        {NAV_LABELS[id] ?? id}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;


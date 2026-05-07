import React, { useState, useEffect } from 'react';

interface BootScreenProps {
    onComplete: () => void;
}

const BOOT_SEQUENCE = [
    "BIOS Date 05/05/26 21:57:57 Ver 1.00",
    "CPU: Neural Processing Unit - 64 Cores",
    "Memory Test: 32768K OK",
    "Mounting file systems... OK",
    "Initializing perception drivers... OK",
    "Starting ROS2 daemon... OK",
    "Calibrating LiDAR and IMU... OK",
    "Loading autonomous modules... OK",
    "Waking up robot...",
    "SYSTEM READY."
];

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        let currentLine = 0;
        
        const interval = setInterval(() => {
            if (currentLine < BOOT_SEQUENCE.length) {
                setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setIsFading(true);
                    setTimeout(onComplete, 500); // Wait for fade out
                }, 800);
            }
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: '#0a0d14', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)',
            zIndex: 99999, padding: '2rem', display: 'flex', flexDirection: 'column',
            opacity: isFading ? 0 : 1, transition: 'opacity 0.5s ease-out',
            pointerEvents: isFading ? 'none' : 'auto'
        }}>
            {lines.map((line, i) => (
                <div key={i} style={{ marginBottom: '0.5rem', textShadow: '0 0 5px var(--accent-green)' }}>{`> ${line}`}</div>
            ))}
            {!isFading && lines.length < BOOT_SEQUENCE.length && (
                <div style={{ height: '1.2rem', width: '10px', background: 'var(--accent-green)', marginTop: '0.5rem', animation: 'blink 1s step-end infinite' }}></div>
            )}
        </div>
    );
};

export default BootScreen;

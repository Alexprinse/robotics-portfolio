import React, { useState, useEffect } from 'react';

const StatusBar: React.FC = () => {
    const [time, setTime] = useState('');
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            const s = now.getSeconds().toString().padStart(2, '0');
            setTime(`${h}:${m}:${s}`);
            setBlink(b => !b);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="status-bar">
            <span className="status-item">
                <span className={`status-dot ${blink ? 'blink' : ''}`} />
                SYSTEM ONLINE
            </span>
            <span className="status-item">ROS2 DAEMON &gt; RUNNING</span>
            <span className="status-item">SLAM &gt; ACTIVE</span>
            <span className="status-item status-clock">{time} IST</span>
        </div>
    );
};

export default StatusBar;

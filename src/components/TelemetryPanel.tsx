import React, { useState, useEffect } from 'react';

interface Metric {
    label: string;
    unit: string;
    base: number;
    range: number;
    color: string;
    fixed: number;
}

const METRICS: Metric[] = [
    { label: 'LIDAR_HZ',   unit: 'Hz',  base: 10.0,  range: 0.4,  color: '#38bdf8', fixed: 1 },
    { label: 'BATTERY',    unit: '%',   base: 97.2,  range: 0.3,  color: '#22c55e', fixed: 1 },
    { label: 'CPU_LOAD',   unit: '%',   base: 24.1,  range: 4.0,  color: '#f59e0b', fixed: 1 },
    { label: 'CTRL_LATENCY', unit: 'ms', base: 4.2, range: 0.8,  color: '#a78bfa', fixed: 2 },
    { label: 'NAV2_STATE', unit: '',    base: 0,     range: 0,    color: '#22c55e', fixed: 0 },
    { label: 'IMU_HZ',     unit: 'Hz',  base: 100.0, range: 0.5,  color: '#38bdf8', fixed: 1 },
];

const TelemetryPanel: React.FC = () => {
    const [values, setValues] = useState<number[]>(METRICS.map(m => m.base));
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const id = setInterval(() => {
            setValues(prev => prev.map((v, i) => {
                const m = METRICS[i];
                if (m.range === 0) return v; // static
                const next = m.base + (Math.random() - 0.5) * m.range;
                return Math.max(0, next);
            }));
        }, 800);
        return () => clearInterval(id);
    }, []);

    if (!visible) return (
        <button
            className="telemetry-restore"
            onClick={() => setVisible(true)}
            title="Show Telemetry"
        >
            📡
        </button>
    );

    const formatValue = (i: number) => {
        const m = METRICS[i];
        if (m.label === 'NAV2_STATE') return 'ACTIVE';
        return values[i].toFixed(m.fixed) + (m.unit ? ` ${m.unit}` : '');
    };

    return (
        <div className="telemetry-panel">
            {/* Header */}
            <div className="telemetry-header">
                <span className="telemetry-title">
                    <span className="telemetry-dot" /> SYS_TELEMETRY
                </span>
                <button className="telemetry-close" onClick={() => setVisible(false)} title="Hide">✕</button>
            </div>

            {/* Metrics */}
            <div className="telemetry-metrics">
                {METRICS.map((m, i) => (
                    <div key={m.label} className="telemetry-row">
                        <span className="telemetry-label">{m.label}</span>
                        <span className="telemetry-value" style={{ color: m.color }}>
                            {formatValue(i)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Mini sparkline bars */}
            <div className="telemetry-bars">
                {METRICS.slice(0, 4).map((m, i) => {
                    const pct = m.range === 0 ? 1 : Math.min(1, (values[i] - (m.base - m.range)) / (m.range * 2));
                    return (
                        <div key={m.label} className="telemetry-bar-track">
                            <div className="telemetry-bar-fill" style={{ width: `${pct * 100}%`, background: m.color }} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TelemetryPanel;

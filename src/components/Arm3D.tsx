import React, { useState, useEffect } from 'react';
import { Arm3DModel } from './Arm3DModel';

const Arm3D: React.FC = () => {
    const [ikMode, setIkMode] = useState(false);
    const [baseRotation, setBaseRotation] = useState(17);
    const [shoulderAngle, setShoulderAngle] = useState(125);
    const [elbowAngle, setElbowAngle] = useState(-111);
    const [wrist1Angle, setWrist1Angle] = useState(79);
    const [wrist2Angle, setWrist2Angle] = useState(-86);
    const [wrist3Angle, setWrist3Angle] = useState(-55);

    const [targetX, setTargetX] = useState(0);
    const [targetY, setTargetY] = useState(2);
    const [targetZ, setTargetZ] = useState(2);

    useEffect(() => {
        if (!ikMode) return;

        const L1 = 3.0; // Upper arm length
        const L2 = 2.6; // Forearm + effector length

        // Base rotation (atan2 of X and Z)
        const baseR = Math.atan2(targetX, targetZ) * (180 / Math.PI);
        
        // Local distance in the arm's plane
        const r = Math.sqrt(targetX * targetX + targetZ * targetZ);
        const y = targetY; // Relative to shoulder

        let d = Math.sqrt(r * r + y * y);
        if (d > L1 + L2) d = L1 + L2 - 0.01; // Clamp to max reach

        const cosAlpha = (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d);
        const alpha = Math.acos(Math.max(-1, Math.min(1, cosAlpha)));
        const gamma = Math.atan2(y, r);
        
        let shoulderR = (gamma + alpha) * (180 / Math.PI);

        const cosBeta = (L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2);
        const beta = Math.acos(Math.max(-1, Math.min(1, cosBeta)));
        
        let elbowR = (beta - Math.PI) * (180 / Math.PI);

        if (isNaN(shoulderR)) shoulderR = 90;
        if (isNaN(elbowR)) elbowR = 0;

        setBaseRotation(baseR);
        setShoulderAngle(shoulderR);
        setElbowAngle(elbowR);

    }, [targetX, targetY, targetZ, ikMode]);

    return (
        <section id="arm" className="visible">
            <h2 className="section-title">Render_Kinematics()</h2>
            <div className="arm-container">
                <div className="arm-canvas-container" id="arm-canvas-container">
                    <Arm3DModel 
                        baseRotation={baseRotation} 
                        shoulderAngle={shoulderAngle} 
                        elbowAngle={elbowAngle} 
                        wrist1Angle={wrist1Angle}
                        wrist2Angle={wrist2Angle}
                        wrist3Angle={wrist3Angle}
                        ikMode={ikMode}
                        targetPos={{ x: targetX, y: targetY, z: targetZ }}
                    />
                </div>
                <div className="sliders-panel hud-bracket">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--accent-blue)', margin: 0 }}>Controls</h3>
                        <button 
                            className="btn" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            onClick={() => setIkMode(!ikMode)}
                        >
                            {ikMode ? 'Switch to FK' : 'Switch to IK'}
                        </button>
                    </div>

                    {!ikMode ? (
                        <div className="sliders-grid">
                            <div className="slider-group">
                                <label>
                                    <span>Base Rotation</span>
                                    <span className="glow-text">{Math.round(baseRotation)}°</span>
                                </label>
                                <input 
                                    type="range" min="-180" max="180" 
                                    value={baseRotation}
                                    onChange={(e) => setBaseRotation(Number(e.target.value))}
                                />
                            </div>
                            <div className="slider-group">
                                <label>
                                    <span>Shoulder Angle</span>
                                    <span className="glow-text">{Math.round(shoulderAngle)}°</span>
                                </label>
                                <input 
                                    type="range" min="0" max="180" 
                                    value={shoulderAngle}
                                    onChange={(e) => setShoulderAngle(Number(e.target.value))}
                                />
                            </div>
                            <div className="slider-group">
                                <label>
                                    <span>Elbow Angle</span>
                                    <span className="glow-text">{Math.round(elbowAngle)}°</span>
                                </label>
                                <input 
                                    type="range" min="-180" max="180" 
                                    value={elbowAngle}
                                    onChange={(e) => setElbowAngle(Number(e.target.value))}
                                />
                            </div>
                            <div className="slider-group">
                                <label>
                                    <span>Wrist 1</span>
                                    <span className="glow-text">{Math.round(wrist1Angle)}°</span>
                                </label>
                                <input 
                                    type="range" min="-180" max="180" 
                                    value={wrist1Angle}
                                    onChange={(e) => setWrist1Angle(Number(e.target.value))}
                                />
                            </div>
                            <div className="slider-group">
                                <label>
                                    <span>Wrist 2</span>
                                    <span className="glow-text">{Math.round(wrist2Angle)}°</span>
                                </label>
                                <input 
                                    type="range" min="-180" max="180" 
                                    value={wrist2Angle}
                                    onChange={(e) => setWrist2Angle(Number(e.target.value))}
                                />
                            </div>
                            <div className="slider-group">
                                <label>
                                    <span>Wrist 3</span>
                                    <span className="glow-text">{Math.round(wrist3Angle)}°</span>
                                </label>
                                <input 
                                    type="range" min="-180" max="180" 
                                    value={wrist3Angle}
                                    onChange={(e) => setWrist3Angle(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="sliders-grid">
                            <p className="full-width" style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                Inverse Kinematics Mode: Set the target position, and the joint angles will be calculated automatically.
                            </p>
                            <div className="slider-group">
                                <label>
                                    <span>Target X</span>
                                    <span className="glow-text-green">{targetX.toFixed(1)}</span>
                                </label>
                                <input 
                                    type="range" min="-5" max="5" step="0.1"
                                    value={targetX}
                                    onChange={(e) => setTargetX(Number(e.target.value))}
                                />
                            </div>
                            <div className="slider-group">
                                <label>
                                    <span>Target Y</span>
                                    <span className="glow-text-green">{targetY.toFixed(1)}</span>
                                </label>
                                <input 
                                    type="range" min="-3" max="5" step="0.1"
                                    value={targetY}
                                    onChange={(e) => setTargetY(Number(e.target.value))}
                                />
                            </div>
                            <div className="slider-group">
                                <label>
                                    <span>Target Z</span>
                                    <span className="glow-text-green">{targetZ.toFixed(1)}</span>
                                </label>
                                <input 
                                    type="range" min="-5" max="5" step="0.1"
                                    value={targetZ}
                                    onChange={(e) => setTargetZ(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Arm3D;

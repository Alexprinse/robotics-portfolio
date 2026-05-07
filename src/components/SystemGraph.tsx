import React, { useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge
} from '@xyflow/react';
import type { Connection, Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
    { id: '1', position: { x: 250, y: 50 }, data: { label: 'LiDAR Sensor' }, style: { background: '#0a0d14', color: '#38bdf8', border: '1px solid #38bdf8' } },
    { id: '2', position: { x: 500, y: 50 }, data: { label: 'Stereo Camera' }, style: { background: '#0a0d14', color: '#38bdf8', border: '1px solid #38bdf8' } },
    { id: '3', position: { x: 375, y: 150 }, data: { label: 'Perception / SLAM Node' }, style: { background: '#0a0d14', color: '#22c55e', border: '1px solid #22c55e' } },
    { id: '4', position: { x: 375, y: 250 }, data: { label: 'Nav2 (Path Planning)' }, style: { background: '#0a0d14', color: '#22c55e', border: '1px solid #22c55e' } },
    { id: '5', position: { x: 375, y: 350 }, data: { label: 'Hardware Controller (ROS2 Control)' }, style: { background: '#0a0d14', color: '#38bdf8', border: '1px solid #38bdf8' } },
    { id: '6', position: { x: 200, y: 450 }, data: { label: 'Left Motor' }, style: { background: '#0a0d14', color: '#ccc', border: '1px solid #666' } },
    { id: '7', position: { x: 550, y: 450 }, data: { label: 'Right Motor' }, style: { background: '#0a0d14', color: '#ccc', border: '1px solid #666' } },
];

const initialEdges: Edge[] = [
    { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#38bdf8' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#38bdf8' } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#22c55e' } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#22c55e' } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#ccc' } },
    { id: 'e5-7', source: '5', target: '7', animated: true, style: { stroke: '#ccc' } },
];

const SystemGraph: React.FC = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <section id="architecture" className="visible" style={{ minHeight: '80vh' }}>
            <h2 className="section-title">System_Architecture()</h2>
            <div className="hud-bracket" style={{ height: '500px', width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    colorMode="dark"
                >
                    <Background color="#38bdf8" gap={20} size={1} />
                    <Controls />
                </ReactFlow>
            </div>
            <p style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.9rem', textAlign: 'center' }}>
                Interactive ROS2 node graph. Drag nodes to reposition.
            </p>
        </section>
    );
};

export default SystemGraph;

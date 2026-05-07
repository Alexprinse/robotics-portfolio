import { Canvas } from '@react-three/fiber';
import { OrbitControls, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface ArmProps {
  baseRotation: number;
  shoulderAngle: number;
  elbowAngle: number;
  wrist1Angle: number;
  wrist2Angle: number;
  wrist3Angle: number;
  ikMode: boolean;
  targetPos: { x: number; y: number; z: number };
}

// UR5 Style Joint with Cyan Caps
const URJoint = ({ radius, length }: { radius: number, length: number }) => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    {/* Dark Gray Housing */}
    <Cylinder args={[radius, radius, length, 32]}>
      <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.6} />
    </Cylinder>
    {/* Cyan/Blue Accent Caps */}
    <Cylinder args={[radius * 0.7, radius * 0.7, length + 0.04, 32]}>
      <meshStandardMaterial color="#38bdf8" metalness={0.2} roughness={0.8} />
    </Cylinder>
  </group>
);

const RoboticArm = ({ baseRotation, shoulderAngle, elbowAngle, wrist1Angle, wrist2Angle, wrist3Angle, ikMode, targetPos }: ArmProps) => {
  // Convert degrees to radians
  const baseRad = THREE.MathUtils.degToRad(baseRotation);
  const shoulderRad = THREE.MathUtils.degToRad(shoulderAngle - 90); 
  const elbowRad = THREE.MathUtils.degToRad(elbowAngle);
  const w1Rad = THREE.MathUtils.degToRad(wrist1Angle);
  const w2Rad = THREE.MathUtils.degToRad(wrist2Angle);
  const w3Rad = THREE.MathUtils.degToRad(wrist3Angle);

  // UR5 approximate relative dimensions
  const baseH = 0.6;
  const link1H = 3.2;
  const link2H = 2.8;

  return (
    <group position={[0, -2, 0]}>
      {/* Base Mount */}
      <Cylinder args={[1.2, 1.4, 0.2, 32]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </Cylinder>
      <Cylinder args={[0.9, 0.9, baseH, 32]} position={[0, 0.2 + baseH/2, 0]}>
        <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.6} />
      </Cylinder>

      {/* Rotating Base */}
      <group rotation={[0, baseRad, 0]} position={[0, 0.2 + baseH, 0]}>
        <Cylinder args={[0.7, 0.7, 0.8, 32]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
        </Cylinder>

        {/* Shoulder Lift Joint */}
        <group position={[0, 0.8, 0]} rotation={[0, 0, shoulderRad]}>
          <URJoint radius={0.65} length={1.4} />

          {/* Upper Arm Link (Offset along Z axis like a real UR5) */}
          <group position={[0, 0, 0.55]}>
            <Cylinder args={[0.45, 0.45, link1H, 32]} position={[0, link1H/2, 0]}>
              <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
            </Cylinder>

            {/* Elbow Joint */}
            <group position={[0, link1H, 0]} rotation={[0, 0, elbowRad]}>
              <URJoint radius={0.55} length={1.2} />

              {/* Forearm Link (Offset back along Z axis) */}
              <group position={[0, 0, -0.45]}>
                <Cylinder args={[0.35, 0.35, link2H, 32]} position={[0, link2H/2, 0]}>
                  <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
                </Cylinder>

                {/* Wrist Complex */}
                <group position={[0, link2H, 0]}>
                   {/* Wrist 1 */}
                   <group rotation={[0, 0, w1Rad]}>
                     <URJoint radius={0.4} length={0.9} />
                     
                     {/* Wrist 2 */}
                     <group position={[0, 0.4, 0.4]} rotation={[Math.PI/2, 0, 0]}>
                       <group rotation={[0, 0, w2Rad]}>
                         <URJoint radius={0.35} length={0.8} />
                         
                         {/* Wrist 3 */}
                         <group position={[0, 0.4, -0.4]} rotation={[-Math.PI/2, 0, 0]}>
                            <group rotation={[0, 0, w3Rad]}>
                              <URJoint radius={0.3} length={0.7} />
                              
                              {/* Tool Flange */}
                              <Cylinder args={[0.25, 0.25, 0.2, 32]} position={[0, 0, 0.35]} rotation={[Math.PI/2, 0, 0]}>
                                <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                              </Cylinder>
                            </group>
                         </group>
                       </group>
                     </group>
                   </group>
                </group>

              </group>
            </group>
          </group>
        </group>
      </group>

      {/* IK Target Marker */}
      {ikMode && (
        <mesh position={[targetPos.x, targetPos.y + 1.25, targetPos.z]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} wireframe />
        </mesh>
      )}
    </group>
  );
};

export const Arm3DModel = ({ baseRotation, shoulderAngle, elbowAngle, wrist1Angle, wrist2Angle, wrist3Angle, ikMode, targetPos }: ArmProps) => {
  return (
    <Canvas camera={{ position: [4, 6, 16], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} />
      <RoboticArm baseRotation={baseRotation} shoulderAngle={shoulderAngle} elbowAngle={elbowAngle} wrist1Angle={wrist1Angle} wrist2Angle={wrist2Angle} wrist3Angle={wrist3Angle} ikMode={ikMode} targetPos={targetPos} />
      <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} minDistance={8} maxDistance={25} />
    </Canvas>
  );
};

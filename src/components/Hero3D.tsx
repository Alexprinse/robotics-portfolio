import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

const RobotMascot = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Gentle floating
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2) * 0.1 - 0.2;
    }
    // Head looking around smoothly
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;
      headRef.current.rotation.x = Math.sin(t * 1.2) * 0.05;
    }
    // Waving arm
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 4) * 0.2 - 0.5;
    }
  });

  const whiteMat = <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />;
  const blueScreenMat = <meshStandardMaterial color="#0022aa" roughness={0.1} metalness={0.8} />;
  const cyanMat = <meshStandardMaterial color="#06b6d4" roughness={0.4} metalness={0.1} />;
  const glowCyanMat = <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} toneMapped={false} />;

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
      {/* HEAD */}
      <group ref={headRef} position={[0, 1.8, 0]}>
        {/* Main Head (Wide rounded box) */}
        <RoundedBox args={[2.2, 1.6, 1.5]} radius={0.6} smoothness={8}>
          {whiteMat}
        </RoundedBox>

        {/* Dark Blue Visor/Screen */}
        <RoundedBox args={[1.8, 1.0, 0.2]} position={[0, 0, 0.7]} radius={0.4} smoothness={8}>
          {blueScreenMat}
        </RoundedBox>

        {/* Eyes (Glowing Cyan happy curves) */}
        <group position={[0, 0.1, 0.81]}>
            {/* Left Eye */}
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI * 0.1]}>
                <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI * 0.8]} />
                {glowCyanMat}
            </mesh>
            {/* Right Eye */}
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI * 0.1]}>
                <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI * 0.8]} />
                {glowCyanMat}
            </mesh>
        </group>

        {/* Ears (White hubs with cyan fins) */}
        {/* Left Ear */}
        <group position={[-1.15, 0, 0]}>
            <Cylinder args={[0.3, 0.3, 0.2, 32]} rotation={[0, 0, Math.PI / 2]}>{whiteMat}</Cylinder>
            <Box args={[0.1, 0.8, 0.3]} position={[-0.15, 0.4, 0]} rotation={[0, 0, 0.1]}>{cyanMat}</Box>
        </group>
        {/* Right Ear */}
        <group position={[1.15, 0, 0]}>
            <Cylinder args={[0.3, 0.3, 0.2, 32]} rotation={[0, 0, Math.PI / 2]}>{whiteMat}</Cylinder>
            <Box args={[0.1, 0.8, 0.3]} position={[0.15, 0.4, 0]} rotation={[0, 0, -0.1]}>{cyanMat}</Box>
        </group>
      </group>

      {/* BODY (Egg shaped) */}
      <group position={[0, -0.1, 0]}>
        {/* Main Egg Body */}
        <mesh scale={[1.3, 1.4, 1.1]}>
            <sphereGeometry args={[1, 32, 32]} />
            {whiteMat}
        </mesh>

        {/* Cyan Chest Plate (Curved triangle/shield) */}
        <mesh position={[0, -0.1, 1.05]} scale={[0.6, 0.6, 0.15]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            {cyanMat}
        </mesh>
        
        {/* Neck Gap/Line */}
        <mesh position={[0, 1.3, 0]} scale={[0.8, 0.05, 0.8]}>
            <cylinderGeometry args={[1, 1, 1, 32]} />
            <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* ARMS */}
      {/* Left Arm (pointing down slightly) */}
      <group position={[-1.6, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <mesh position={[0, -0.6, 0]}>
            <capsuleGeometry args={[0.35, 0.8, 16, 16]} />
            {whiteMat}
        </mesh>
      </group>

      {/* Right Arm (Waving up) */}
      <group position={[1.6, 0.5, 0]} ref={rightArmRef}>
        <mesh position={[0, 0.6, 0]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.35, 0.8, 16, 16]} />
            {whiteMat}
        </mesh>
      </group>

    </group>
  );
};

const Hero3D = () => {
  return (
    <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, 5]} intensity={0.6} color="#06b6d4" />
      <RobotMascot />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 2 - 0.2} />
    </Canvas>
  );
};

export default Hero3D;

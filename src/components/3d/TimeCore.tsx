import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Ring, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const TimeCore3D: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.005;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y += 0.002;
      ringsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <>
      {/* Central Energy Core */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00f0ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={0.8}
            emissive="#00f0ff"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Inner Glow */}
      <Sphere args={[1.1, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Orbital Rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <Ring
            key={i}
            args={[1.4 + i * 0.3, 1.45 + i * 0.3, 64]}
            rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}
          >
            <meshBasicMaterial
              color={i === 1 ? '#a855f7' : '#00f0ff'}
              transparent
              opacity={0.5 - i * 0.1}
              side={THREE.DoubleSide}
            />
          </Ring>
        ))}
      </group>

      {/* Floating Particles */}
      <ParticleField />

      {/* Ambient Light */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#a855f7" />
    </>
  );
};

const ParticleField: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 3;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

interface TimeCoreProps {
  className?: string;
}

const TimeCore: React.FC<TimeCoreProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <TimeCore3D mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default TimeCore;

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingObject3DProps {
  type: 'icosahedron' | 'octahedron' | 'torus' | 'box';
  color: string;
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

const FloatingObject3D: React.FC<FloatingObject3DProps> = ({
  type,
  color,
  position,
  scale = 1,
  rotationSpeed = 1,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * rotationSpeed;
      meshRef.current.rotation.y += 0.008 * rotationSpeed;
    }
  });

  const Component = {
    icosahedron: Icosahedron,
    octahedron: Octahedron,
    torus: Torus,
    box: Box,
  }[type];

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Component
        ref={meshRef}
        args={[type === 'torus' ? [0.5, 0.2, 16, 32] : [0.5, 0]]}
        position={position}
        scale={scale}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Component>
    </Float>
  );
};

interface FloatingObjectsProps {
  className?: string;
  objects?: Array<{
    type: 'icosahedron' | 'octahedron' | 'torus' | 'box';
    color: string;
    position: [number, number, number];
    scale?: number;
    rotationSpeed?: number;
  }>;
}

const FloatingObjects: React.FC<FloatingObjectsProps> = ({
  className,
  objects = [
    { type: 'icosahedron', color: '#00f0ff', position: [-3, 2, 0], scale: 0.8 },
    { type: 'octahedron', color: '#a855f7', position: [3, -1, 1], scale: 0.6 },
    { type: 'torus', color: '#00f0ff', position: [-2, -2, -1], scale: 0.5 },
    { type: 'box', color: '#a855f7', position: [2, 2, -2], scale: 0.4 },
  ],
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#a855f7" />

        {objects.map((obj, i) => (
          <FloatingObject3D key={i} {...obj} />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingObjects;

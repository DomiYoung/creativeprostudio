import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function WaveMesh({ color = '#8466e3', ...props }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  
  // 创建动态波浪效果
  useFrame((state, delta) => {
    if (mesh.current) {
      const position = mesh.current.geometry.attributes.position;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // 应用波浪变形
        const waveX1 = 0.25 * Math.sin(x * 2 + time * 0.7);
        const waveX2 = 0.15 * Math.sin(x * 3 + time * 0.5);
        const waveY1 = 0.1 * Math.sin(y * 5 + time * 0.7);
        
        position.setZ(i, waveX1 + waveX2 + waveY1);
      }
      
      position.needsUpdate = true;
    }
  });
  
  return (
    <mesh
      {...props}
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    >
      <planeGeometry args={[4, 2, 32, 32]} />
      <meshStandardMaterial
        color={color}
        wireframe={false}
        side={THREE.DoubleSide}
        flatShading
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function WaveAnimation({ 
  bgColor = '#1c0c50', 
  waveColor = '#8466e3',
  height = '400px',
  interactive = true 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative w-full" 
      style={{ height, backgroundColor: bgColor, borderRadius: '12px', overflow: 'hidden' }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <WaveMesh color={waveColor} position={[0, 0, 0]} />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </motion.div>
  );
} 
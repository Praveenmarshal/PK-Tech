import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshReflectorMaterial } from "@react-three/drei";
import { useRef } from "react";

function NeuralEnvironment() {
  const ring = useRef();

  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.z = state.clock.elapsedTime * 0.12;
    ring.current.rotation.x = 1.1 + state.pointer.y * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 3, 5]} color="#c4b5fd" intensity={2} />
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh ref={ring} position={[1.6, 0.2, 0]}>
          <torusGeometry args={[1.7, 0.018, 24, 160]} />
          <meshStandardMaterial color="#c4b5fd" metalness={0.8} roughness={0.18} />
        </mesh>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[24, 24]} />
        <MeshReflectorMaterial color="#f7f7f5" mirror={0.38} roughness={0.22} blur={[420, 120]} />
      </mesh>
      <Environment preset="city" />
    </>
  );
}

export default function CinematicR3F() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 44 }}>
      <NeuralEnvironment />
    </Canvas>
  );
}


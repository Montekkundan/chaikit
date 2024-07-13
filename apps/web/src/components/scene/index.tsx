'use client';
import { Canvas } from '@react-three/fiber'
import Model from './model';
import { Environment } from '@react-three/drei'

export default function Index() {
  return (
    <Canvas>
        <Model />
        <directionalLight intensity={2} position={[0, 2, 3]}/>
        <Environment preset="apartment" />
    </Canvas>
  )
}
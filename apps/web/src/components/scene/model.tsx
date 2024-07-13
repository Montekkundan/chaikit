import React, { useRef } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Model() {
    const { nodes } = useGLTF("/models/chai.glb") as any;
    const { viewport } = useThree();
    const chaiCup = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (chaiCup.current) {
            chaiCup.current.rotation.y += 0.01;
            chaiCup.current.rotation.x = Math.sin(chaiCup.current.rotation.y) * 0.5;
            chaiCup.current.rotation.z = Math.sin(chaiCup.current.rotation.y + Math.PI * 2) * 0.5;
        }
    });

    /*
    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
    });
    */

    return (
        <group scale={viewport.width / 3.75}>
            <Text font={'/fonts/PPNeueMontreal-Bold.otf'} position={[0, 0, -1]} fontSize={1} color="white" anchorX="center" anchorY="middle">
                ChaiKit
            </Text>
            <group position={[-0.002, -0.225, 0]} scale={2.5}>
                <mesh ref={chaiCup} geometry={nodes.Object_13.geometry}>
                    <MeshTransmissionMaterial 
                        thickness={0.2}
                        roughness={0}
                        transmission={1}
                        ior={1.2}
                        chromaticAberration={0.02}
                        backside={true}
                    />
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload('/models/chai.glb');

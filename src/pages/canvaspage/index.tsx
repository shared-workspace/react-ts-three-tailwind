import React from 'react';
// import react fiber and drei for 3d rendering
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import CanvasUI from './components/CanvasUI';
export default function CanvasPage() {
    return (
        <div className='w-screen h-screen relative'>
            <CanvasUI />
            <Canvas>
                <Settings />
            </Canvas>
        </div>
    );
}

const Settings = () => {
    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box>
                <meshStandardMaterial attach="material" color="hotpink" />
            </Box>
            <OrbitControls />
        </>
    )
}
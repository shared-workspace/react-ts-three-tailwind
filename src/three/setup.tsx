import React from "react";
import * as THREE from "three";
import * as Fiber from "@react-three/fiber";
import ThreeScene from "./scene";
import { useThreeProps } from "./canvas";
import { OrbitControls as FControls } from "@react-three/drei";
import { OrbitControls } from 'three/examples/jsm/Addons.js';
 Fiber.extend({ OrbitControls });

export default function ThreeSetup() {
    const [loadScene, setLoadScene] = React.useState(false);
    useThreeProps().useThree(Fiber.useThree()); 
    React.useEffect(() => {
        setLoadScene(true);
        console.log("Setup complete !");
        return () => { setLoadScene(false); }
    }, []);
    return <>
        <FControls />
        {/* <Controls target={new THREE.Vector3(10, 10, 10)}  /> */}
        <Settings />
        {loadScene ? <ThreeScene /> : <></>}
    </>
}

function Settings() {
    const three = Fiber.useThree();
    React.useEffect(() => {
        three.gl.setClearColor(0xffffff);
        // three.gl.setClearColor(0x111111);
    }, [three.gl])
    return <></>
}

export function CameraHelper({ camera, updateCamera }: { camera: THREE.Camera, updateCamera: boolean }){
    const three = Fiber.useThree();
    if (updateCamera) {
        if (camera instanceof THREE.OrthographicCamera) (three.camera as THREE.OrthographicCamera).copy(camera);
        else if (camera instanceof THREE.PerspectiveCamera) (three.camera as THREE.PerspectiveCamera).copy(camera);
        return <></>
    } else 
        return <group position={camera.position} rotation={camera.rotation}><cameraHelper args={[camera]} /></group>
}

interface ControlProps extends Partial<OrbitControls> {
    // enableZomm?: boolean;
}
export function Controls(props: ControlProps) {
    const three = Fiber.useThree();
    const controlsRef = React.useRef<OrbitControls>(new OrbitControls(three.camera, three.gl.domElement));
    Fiber.useFrame(() => { controlsRef.current?.update(); });
    return <primitive {...props} object={controlsRef.current} />
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import * as THREE from "three"
import * as Fiber from "@react-three/fiber";
import { useThreeProps } from "./canvas";
import { CameraHelper } from "./setup";
import { fragmentShader, vertexShader } from "./shaders";
import { AshimaCodePnoise } from "../noise/ashima";
import { FluidPartcles, FluidPartclesTest } from "./fluid";
import { GUI } from "dat.gui";

export default function ThreeScene(){
    React.useEffect(() => {
        // if (!Ref.current) return;
        console.log("scene setup Complete !");
    }, []);
    // const Ref = React.useRef<THREE.Mesh>(null);
    return <>
        {/* <axesHelper /> */}
        <SphereGUI />
        {/* <FluidPartcles /> */}
        {/* <FluidPartclesTest /> */}
        {/* <SphereWithNoise /> */}
        {/* <AnimateShape /> */}
    </>
}


function SphereGUI(){
    const mesh = React.useRef(new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe: true}))).current;
    const options = React.useRef({radius: 2}).current;
    React.useEffect(() => {
        const gui = new GUI();
        // const Options = gui.addFolder('Options');
        gui.add(options, "radius", 0, 10).onChange((r: number)=>{
            mesh.geometry = new THREE.SphereGeometry(r) ;
        });
        gui.add(mesh.rotation, 'x', 0, Math.PI * 2);
        gui.add(mesh.rotation, 'y', 0, Math.PI * 2);
        gui.add(mesh.rotation, 'z', 0, Math.PI * 2);
        return () => {
            gui.destroy();
        };
    }, []);
    return <primitive object={mesh} />
}

function SphereWithNoise(){
    const three = Fiber.useThree();
    const mesh = React.useRef(new THREE.Mesh(new THREE.BoxGeometry(5, 5), new THREE.MeshNormalMaterial()));
    React.useEffect(() => {
        three.scene.add(mesh.current); console.log("sphere add");
        return () => {
            console.log("sphere removed");
            three.scene.remove(mesh.current);
        }
    }, []);
    Fiber.useFrame(() => {
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;
    });
    return <>
        <primitive object={mesh} />
    </>
}

const o = {i: 0};
function AnimateShape(){
    const Ref = React.useRef<THREE.Mesh>(null);
    console.log("o:i", o.i);
    React.useEffect(() => {
        console.log("o", o.i);
        console.log("AnimateShape rendered !");
        if (!Ref.current) return;
        console.log("scene setup Complete !");
    }, [o]);
    o.i++;
    Fiber.useFrame(()=>{
        if (!Ref.current) return;
        const mesh = Ref.current;
        mesh.rotation.x += 0.01;
    })
    // const camera = new THREE.PerspectiveCamera(60, 1, 1, 5);
    // camera.position.set(0, 5, 0);
    // camera.rotation.set(-Math.PI/2, 0, 0);

    return <>
        {/* <CameraHelper camera={camera} updateCamera={true} /> */}
        <mesh
            ref={Ref}
            position={[0, 0, 0]}
            geometry={new THREE.SphereGeometry(3)}
            material={new THREE.ShaderMaterial({ side: THREE.DoubleSide, wireframe: true, fragmentShader, vertexShader })}
            // material={new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, wireframe: true })}
        />
    </>
}

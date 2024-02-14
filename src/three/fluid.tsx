/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import * as THREE from "three";
import * as Fiber from "@react-three/fiber";
import { fragmentShader, vertexShader } from "./shaders";
import { GUI } from "dat.gui";
import { useThreeProps } from "./canvas";


interface Props {
    radius?: number,
    spacing?: number,
    scale?: number,
    color?: THREE.Color,
    speed?: number,
    InfluenceRadius?: number,
    repulsionStrength?: number
}
function CreateGUI(options: React.MutableRefObject<{
    radius: number;
    scale: number;
    spacing: number;
    speed: number;
    color: THREE.Color;
    InfluenceRadius: number;
    repulsionStrength: number;
}>){
    const gui = new GUI();
    const Options = gui.addFolder('Options');

    Options.add(options.current, "radius", 0, 100);
    Options.add(options.current, "InfluenceRadius", 0, 100);
    Options.add(options.current, "repulsionStrength", 0, 100);
    Options.add(options.current, "scale", 0, 100);
    Options.add(options.current, "spacing", 0, 100);
    Options.add(options.current, "speed", 0, 100);
    Options.addColor(options.current, "color");

    return () => {
        gui.removeFolder(Options);
        gui.destroy();
    }
}
export function FluidPartcles(props?: Props) {
    // const { clock } = Fiber.useThree();
    const options = React.useRef({
        radius: props?.radius || 2,
        scale: props?.scale || 1,
        spacing: props?.spacing || 1,
        speed: props?.speed || 1,
        color: props?.color || new THREE.Color(0xaabbff),
        InfluenceRadius: props?.InfluenceRadius || 0,
        repulsionStrength: props?.repulsionStrength || 0
    });
    const particles = React.useRef<Array<THREE.Vector2>>([]);
    // const gui = useThreeProps().gui;
    const mesh = React.useRef(new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.ShaderMaterial())).current;
    const material = mesh.material;
    const geometry = mesh.geometry;
    // const mesh = React.useMemo(() => { return new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.ShaderMaterial()); }, []); 

    React.useEffect(() => {
        const material = mesh.material;
        material.uniforms["time"] = { value: 0 };
        material.uniforms["LimitX"] = { value: window.innerWidth };
        material.uniforms["LimitY"] = { value: window.innerHeight };
        material.uniforms["particles"] = { value: particles };
        material.fragmentShader = fragmentShader
        return CreateGUI(options);
    }, [material.fragmentShader]);

    return <primitive object={mesh} />
}


// export class FluidPartcles extends React.Component<Props, States> {
//     private options: GUI_Options;
//     private Ref: React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial>>
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             isAnimateSet: false
//         }
//         this.Ref = React.createRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial>>();
//         this.options = { color: new THREE.Color(0xaabbff), radius: props?.radius || 2, scale: props?.scale || 1, speed: props?.speed || 1, spacing: props?.spacing || 1, InfluenceRadius: 1, repulsionStrength: 1 };
//     }
//     componentDidMount(): void {
//         if (!this.Ref.current) return;
//         const particles: Array<THREE.Vector2> = [new THREE.Vector2(0, 0)];
//         const material = this.Ref.current.material;
//         material.uniforms["time"] = { value: 0 };
//         material.uniforms["LimitX"] = { value: window.innerWidth };
//         material.uniforms["LimitY"] = { value: window.innerHeight };
//         material.uniforms["particles"] = { value: particles };
//         material.vertexShader = vertexShader;
//         material.fragmentShader = fragmentShader;
//     }
//     startAnimation(){
//         this.props.Animate((time) => {
//             if (this.Ref.current) {
//                 const mesh = this.Ref.current;
//                 mesh.material.uniforms["time"].value = time;
//             }
//         });
        
//     }
//     render(): React.ReactNode {
//         return <mesh
//             ref={this.Ref}
//             position={[0, 0, 0]}
//             geometry={new THREE.PlaneGeometry(10, 10)}
//             material={new THREE.ShaderMaterial({ side: THREE.DoubleSide })}
//         /> 
//     }

// }
// export function FluidPartcles(props: Props) {
//     const Ref = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial>>(null);
//     const { clock } = Fiber.useThree();
//     const options = { color: new THREE.Color(0xaabbff), radius: props?.radius || 2, scale: props?.scale || 1, speed: props?.speed || 1, spacing: props?.spacing || 1, InfluenceRadius: 1, repulsionStrength: 1 };

//     React.useEffect(() => {
//         if (!Ref.current) return;
//         const particles: Array<THREE.Vector2> = [new THREE.Vector2(0, 0)];
//         const material = Ref.current.material;
//         material.uniforms["time"] = { value: 0 };
//         material.uniforms["LimitX"] = { value: window.innerWidth };
//         material.uniforms["LimitY"] = { value: window.innerHeight };
//         material.uniforms["particles"] = { value: particles };
//         material.vertexShader = vertexShader;
//         material.fragmentShader = fragmentShader;
//     }, []);

//     Fiber.useFrame(() => {
//         if (Ref.current) {
//             const mesh = Ref.current;
//             mesh.material.uniforms["time"].value = clock.getElapsedTime();
//         }
//     });

//     return (
//         <mesh
//             ref={Ref}
//             position={[0, 0, 0]}
//             geometry={new THREE.PlaneGeometry(10, 10)}
//             material={new THREE.ShaderMaterial({ side: THREE.DoubleSide })}
//         />
//     );
// }

export function FluidPartclesTest() {
    const three = Fiber.useThree();
    const Ref = React.useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial>>(null);
    React.useEffect(() => {
        if (!Ref.current) return;
        // const mesh = Ref.current;
        // mesh.material.vertexShader = vertexShader;
        // mesh.material.fragmentShader = fragmentShader;
        console.log("scene setup Complete !");
    }, []);
    // const R = 5;
    three.camera.position.set(0, 0, 10);
    Fiber.useFrame(() => {
        if (Ref.current) {
            const mesh = Ref.current;
            mesh.material.uniforms["time"].value = three.clock.getElapsedTime();
        }
    });
    return <>
        <mesh
            ref={Ref}
            position={[0, 0, 0]}
            geometry={new THREE.PlaneGeometry(10, 10)}
            material={new THREE.ShaderMaterial({ 
                side: THREE.DoubleSide, 
                uniforms: { "time": { value: 0 } },
                fragmentShader: `varying vec2 vUv;

                void main() {
                gl_FragColor = vec4(vec3(0.98), 1.0);
            }`
            })}
        // rotation={[Math.PI / 2, 0, 0]}

        />
    </>
}

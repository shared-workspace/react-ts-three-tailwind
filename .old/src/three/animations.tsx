import React from "react";
import { useThreeProps } from "./threeProps/provider";

function BallAnimation() {
    const three = useThreeProps().useThree();
    const Ref = React.useRef<THREE.Mesh>(null);
    React.useEffect(() => {
        if (!Ref.current) return;
        const mesh = Ref.current;
        const R = 5;
        three?.Animate.set(mesh.uuid, () => {
            const time = three.clock.getElapsedTime();
            mesh.position.x = R * Math.sin(time * 0.5);
            mesh.position.y = R * Math.cos(time);
        });
    }, []);
    return <>
        <gridHelper args={[20, 20]} />
        <axesHelper args={[10]} />
        <mesh ref={Ref} position={[0, 0, 0]} >
            <sphereGeometry args={[1]} />
            <meshNormalMaterial />
        </mesh>
    </>
}
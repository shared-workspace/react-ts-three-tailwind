import React from "react";
import * as THREE from "three";
import { useMouseState } from "./states";
import { useThreeProps } from "../canvas";
export default function MouseHandler(){
  const States = useMouseState();
  // if (!States) return;
  const three = useThreeProps().useThree();
  const trackMousePointer = (e: MouseEvent): void  => {
    const coords = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    if (three) three.raycaster.setFromCamera(coords, three.camera);
    States.pointer.setStatus(coords);
  }
  // const getMesh = (e: MouseEvent) => {
  //   if (three) console.log(three.raycaster.intersectObjects(three.scene.children));
  // }
  React.useEffect(() => {
    window.addEventListener('mousemove', trackMousePointer);
    // window.addEventListener("click", getMesh);
    console.log("Mouse Handler Active !");
    return () => {
      // window.removeEventListener("click", getMesh);
      window.removeEventListener('mousemove', trackMousePointer);
    }
  },[])
  
  return <div className="keyborHandler Active absolute z-10 bg-transparent w-1/4 text-blue-300 right-0 top-2 items-end">
    <div className="orbital-control-status w-full">Pointer: </div>
    <div className="orbital-control-status pl-4 w-full">X: {(States.pointer.status.x).toFixed(3)}</div>
    <div className="orbital-control-status pl-4 w-full">Y: {(States.pointer.status.y).toFixed(3)}</div>
  </div>
}
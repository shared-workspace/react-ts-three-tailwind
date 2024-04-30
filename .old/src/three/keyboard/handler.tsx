import React from "react";
import { useKeyboardState } from "./states";
export default function KeyboardHandler(){
  const States = useKeyboardState();
  const handleKeyPress = (event: KeyboardEvent): void  => {
    switch(event.key) {
      case "r": case "R":
        States.orbitalContol.setStatus(prev => !prev);
      }
    }
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    console.log("Keyboard Handler Active !");
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  },[])
  return <div className="keyborHandler Active absolute top-2 z-10 bg-transparent w-1/4 text-red-300 p-2">
    <div className="orbital-control-status">OrbitalControl: {States.orbitalContol.status ? "Active" : "Deactive"}</div>
  </div>
}
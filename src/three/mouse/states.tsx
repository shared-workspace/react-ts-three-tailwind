import React from 'react';
import * as THREE from "three";
// ######################----------------------
// ######################----------------------
interface MouseStateProp {
  pointer: {
    status: THREE.Vector2;
    setStatus: React.Dispatch<React.SetStateAction<THREE.Vector2>>;
  }
}
export const mouseStateContext = React.createContext<MouseStateProp | undefined>(undefined);
export const MouseStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pointer, setPointer] = React.useState(new THREE.Vector2(0, 0));
  const mouseStateProp: MouseStateProp = {
    pointer: {
      status: pointer,
      setStatus: setPointer
    }
  };
  return (
    <mouseStateContext.Provider value={mouseStateProp}>
      {children}
    </mouseStateContext.Provider>
  );
};
// ######################----------------------
// ######################----------------------
export const useMouseState = () => {
  const context = React.useContext(mouseStateContext);
  if (!context) {
    throw new Error('useMouseState must be used within a mouseStateProvider');
  }
  return context;
};
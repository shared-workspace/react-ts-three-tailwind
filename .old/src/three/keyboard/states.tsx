import React from 'react';
// ######################----------------------
// ######################----------------------
interface KeyboardStateProp {
  orbitalContol: {
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  }
}
export const keyboardStateContext = React.createContext<KeyboardStateProp | undefined>(undefined);
export const KeyboardStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orbitalContol, setOrbitalContol] = React.useState(false);
  const keyboardStateProp: KeyboardStateProp = {
    orbitalContol: {
      status: orbitalContol,
      setStatus: setOrbitalContol
    }
  };
  return (
    <keyboardStateContext.Provider value={keyboardStateProp}>
      {children}
    </keyboardStateContext.Provider>
  );
};
// ######################----------------------
// ######################----------------------
export const useKeyboardState = () => {
  const context = React.useContext(keyboardStateContext);
  if (!context) {
    throw new Error('useKeyboardState must be used within a keyboardStateProvider');
  }
  return context;
};
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// import * as THREE from "three";
import * as Fiber from "@react-three/fiber";
import KeyboardHandler from "./keyboard/handler";
import { KeyboardStateProvider } from "./keyboard/states";
import MouseHandler from "./mouse/handler";
import { MouseStateProvider } from "./mouse/states";
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import ThreeSetup from "./setup";
Fiber.extend({ OrbitControls });

export default function ThreeCanvas(): React.ReactNode {
    const Ref = React.createRef<HTMLDivElement>()
    return <>
        <div ref={Ref} id="canvas-container" className="relative w-full h-[100vh] z-0">
            <ThreePropsProvider>
                <KeyboardStateProvider>
                    <MouseStateProvider>
                        <Fiber.Canvas><ThreeSetup /></Fiber.Canvas>
                        {/* set Handler after ThreeProps is set */}
                        <ThreePropsContext.Consumer>{threeProps => threeProps ? (<>
                            {threeProps.useThree() ?  (<>
                            <KeyboardHandler />
                            <MouseHandler />
                            </>) : <></> }
                        </>) : <></>}
                        </ThreePropsContext.Consumer>
                    </MouseStateProvider>
                </KeyboardStateProvider>
            </ThreePropsProvider>
        </div>
    </>
}

interface ThreePropsType {
    setContainer: (div: HTMLDivElement | null) => HTMLDivElement | null
    container: HTMLDivElement | null
    useThree: (t?: Fiber.RootState) => Fiber.RootState | undefined;
    Animate: Map<string, () => void>;
}

export const ThreePropsContext = React.createContext<ThreePropsType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useThreeProps = () => {
    const threeProps = React.useContext(ThreePropsContext);
    if (!threeProps) throw new Error("useThreeProps must be used within an ThreePropsProvider");
    return threeProps;
};

export const ThreePropsProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
    const [three, setThree] = React.useState<Fiber.RootState>();
    const AnimateRef = React.useRef<Map<string, () => void>>(new Map<string, () => void>())
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
    React.useEffect(() => {
        if (!three) return;
        console.log("threeProps set !");
        three.gl.setClearColor(0x555555);
    }, [three])
    return (
        <ThreePropsContext.Provider value={{
            setContainer: (div) => {
                setContainer(div);
                return div;
            },
            container: container,
            useThree(t) {
                if (t && !three) return setThree(t), t;
                return three;
            },
            Animate: AnimateRef.current
        }}>
            {children}
        </ThreePropsContext.Provider>
    );
};

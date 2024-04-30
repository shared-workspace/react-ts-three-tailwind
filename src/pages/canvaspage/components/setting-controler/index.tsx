/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useViewToggleContext } from "../view-toggle";

const LIGHT : {
    [key: string]: string;
} = {
    AMBIENT_LIGHT: "Ambient Light",
    POINT_LIGHT: "Point Light",
    DIRECTIONAL_LIGHT: "Directional Light",
    SPOT_LIGHT: "Spot Light",
    RECT_AREA_LIGHT: "Rect Area Light",
    HEMISPHERE_LIGHT: "Hemisphere Light",
    AREA_LIGHT: "Area Light"
};

const CAMERA : {
    [key: string]: string;
} = {
    PERSPECTIVE_CAMERA: "Perspective Camera",
    ORTHOGRAPHIC_CAMERA: "Orthographic Camera"
};

interface Props {
    side: "left" | "right";
    maxWidth?: number;
    minWidth?: number;
}
export default function SettingControler(props: Props) {
    const { isViewFull } = useViewToggleContext();
    const [style, setStyle] = React.useState({} as React.CSSProperties);
    const [showControler, setShowControler] = React.useState(false);
    const { light, camera, setLight, setCamera } = useSettingControlerContext();
    React.useEffect(() => {
        const style: React.CSSProperties = {}; // Explicitly define the type of the style object
        if (props.side === "left") {
            style.left = 0;
        } else {
            style.right = 0;
        }
        style.maxWidth = props.maxWidth ? `${props.maxWidth}rem` : "16rem";
        style.minWidth = props.minWidth ? `${props.minWidth}rem` : "10rem";

        setStyle(style);
    }, [props.side, props.maxWidth, props.minWidth]);
    return (
        <div 
            className={`absolute z-50 top-0 p-4 bg-black bg-opacity-30 text-white w-1/2 ${isViewFull ? "hidden": ""}`}
            style={style}
        >
            <button
                onClick={() => setShowControler(!showControler)}
                className="absolute top-0 right-0 p-2"
            >{showControler ? "Close" : "Open"}</button>

            {
                showControler ? (<>
                <h1 className="text-xl font-bold text-center">Settings</h1>
                <div className="mx-auto ">
                    <h3 className="text-lg font-bold">Light</h3>
                    {
                            Object.keys(LIGHT).map((Light, index) => {
                            return (
                                <label key={index} className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={light === LIGHT[Light]}
                                        onChange={() => setLight(LIGHT[Light])}
                                    />
                                    <span className="ml-2">{Light}</span>
                                </label>
                            );
                        })
                    }
                    <h3 className="text-lg font-bold">Camera</h3>
                    {
                            Object.keys(CAMERA).map((Camera, index) => {
                            return (
                                <label key={index} className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={camera === CAMERA[Camera]}
                                        onChange={() => setCamera(CAMERA[Camera])}
                                    />
                                    <span className="ml-2">{Camera}</span>
                                </label>
                            );
                        })
                    }
                </div>
                </>) : (<></>)
            }
        </div>
    );
}

interface ContextProps {
    light: string;
    camera: string;
    setLight: (light: string) => void;
    setCamera: (camera: string) => void;
}

const Context = React.createContext<ContextProps | undefined>(undefined);

export const useSettingControlerContext = () => {
    const context = React.useContext(Context);
    if (!context) throw new Error("Context must be used within an Context Provider");
    return context;
};

export const SettingControlerProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [light, setLight] = React.useState("ambient");
    const [camera, setCamera] = React.useState("perspective");

    return (
        <Context.Provider value={{ light, camera, setLight, setCamera }}>
            {children}
        </Context.Provider>
    );
};
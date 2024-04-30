/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faIcons from '@fortawesome/free-solid-svg-icons';

export default function ViewToggle() {
    const { isViewFull, toggleView } = useViewToggleContext();
    return (
        <>
            <div className="toggle-view absolute z-50 top-0 left-1/2 bg-gray-200 px-2 py-3">
                <button type='button' className="px-2" onClick={toggleView}>
                    {
                        isViewFull ? (
                            <FontAwesomeIcon icon={faIcons.faCompress} />
                        ) : (
                            <FontAwesomeIcon icon={faIcons.faExpand} />
                        )
                    }
                </button>
            </div>
        </>
    );
}


interface Props {
    isViewFull: boolean;
    toggleView: () => void;
}

const Context = React.createContext<Props | undefined>(undefined);

export const useViewToggleContext = () => {
    const context = React.useContext(Context);
    if (!context) throw new Error("Context must be used within an Context Provider");
    return context;
};

export const ToggleViewProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [isViewFull, setIsViewFull] = React.useState(true);
    const toggleView = () => setIsViewFull(!isViewFull);

    return (
        <Context.Provider value={{ isViewFull, toggleView }}>
            {children}
        </Context.Provider>
    );
};


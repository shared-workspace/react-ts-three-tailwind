import React from 'react';

interface ExampleStateContextType {
    StateExampleFocus: {
        value: boolean,
        setState: React.Dispatch<React.SetStateAction<boolean>>,
    },
}

const ExampleStateContext = React.createContext<ExampleStateContextType | undefined>(undefined);

export const useExampleStateContext = () => {
    const exampleStateContext = React.useContext(ExampleStateContext);
    if (!exampleStateContext) throw new Error("useExampleStateContext must be used within an ExampleStateContextProvider");
    return exampleStateContext;
};

export const ExampleStateContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const [exampleFocus, setExampleFocus] = React.useState<boolean>(true);

    const ExampleStatesProps: ExampleStateContextType = {
        StateExampleFocus: {
            value: exampleFocus,
            setState: setExampleFocus
        }
    }

    return (
        <ExampleStateContext.Provider value={ExampleStatesProps}>
            {children}
        </ExampleStateContext.Provider>
    );
};
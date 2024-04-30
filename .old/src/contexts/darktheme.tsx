import React from 'react';

interface DarkModeContextType {
    toggleDarkTheme: () => void;
}

export const DarkModeContext = React.createContext<DarkModeContextType | undefined>(undefined);

export const useDarkModeContext = () => {
    const darkmodeContext = React.useContext(DarkModeContext);
    if (!darkmodeContext) throw new Error("useDarkModeContext must be used within an DarkModeContextProvider");
    return darkmodeContext;
};

export const DarkModeContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    React.useEffect(() => {
        if (!('theme' in localStorage)) {
            localStorage.theme = "dark";
        } else {
            const isDarkTheme = localStorage.theme === "dark";
            if (isDarkTheme) {
                document.documentElement.classList.add('dark');
            }
            setDarkTheme(isDarkTheme);
        }
    }, []);

    const [darkTheme, setDarkTheme] = React.useState<boolean>(() => {
        return localStorage.theme === "dark";
    });

    const DarkModesProps: DarkModeContextType = {
        toggleDarkTheme: () => {
            const newDarkTheme = !darkTheme;
            setDarkTheme(newDarkTheme);
            localStorage.theme = newDarkTheme ? "dark" : "light";
            if (newDarkTheme) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    return (
        <DarkModeContext.Provider value={DarkModesProps}>
            {children}
        </DarkModeContext.Provider>
    );
};

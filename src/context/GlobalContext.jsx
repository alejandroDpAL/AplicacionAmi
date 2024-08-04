import React, { createContext } from 'react';
import { MascotasProvider } from './MascotasContext';
import { VacunasProvider } from './VacunasContext';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const globalContextValue = {}; // Aquí puedes añadir valores globales si es necesario

    return (
        <GlobalContext.Provider value={globalContextValue}>
            <MascotasProvider>
                <VacunasProvider>
                    {children}
                </VacunasProvider>
            </MascotasProvider>
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

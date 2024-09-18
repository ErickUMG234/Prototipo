/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

// Crear el contexto para proveedores
export const EgresosContext = createContext();

export const UPLOAD_EGRESOS = 'UPLOAD_EGRESOS';
// Definir el reductor
const egresosReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_EGRESOS:
            return { ...state, egresos: action.payload };
        default:
            return state;
    }
};

// Proveedor del contexto de proveedores
export const EgresosProvider = ({ children }) => {
    const [state, dispatch] = useReducer(egresosReducer, { egresos: [] });

    return (
        <EgresosContext.Provider value={{ ...state, dispatch }}>
            {children}
        </EgresosContext.Provider>
    );
};
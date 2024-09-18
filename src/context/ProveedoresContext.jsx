/* eslint-disable react/prop-types */

import { createContext, useReducer } from 'react';

// Crear el contexto para proveedores
export const ProveedoresContext = createContext();

export const UPLOAD_PROVEEDORES = 'UPLOAD_PROVEEDORES';
// Definir el reductor
const proveedoresReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_PROVEEDORES:
            return { ...state, proveedores: action.payload };
        default:
            return state;
    }
};

// Proveedor del contexto de proveedores
export const ProveedoresProvider = ({ children }) => {
    const [state, dispatch] = useReducer(proveedoresReducer, { proveedores: [] });

    return (
        <ProveedoresContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProveedoresContext.Provider>
    );
};







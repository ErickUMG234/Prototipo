/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

// Crear el contexto para proveedores
export const IngresosContext = createContext();

export const UPLOAD_INGRESOS = 'UPLOAD_INGRESOS';
// Definir el reductor
const ingresosReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_INGRESOS:
            return { ...state, ingresos: action.payload };
        default:
            return state;
    }
};

// Proveedor del contexto de proveedores
export const IngresosProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ingresosReducer, { ingresos: [] });

    return (
        <IngresosContext.Provider value={{ ...state, dispatch }}>
            {children}
        </IngresosContext.Provider>
    );
};


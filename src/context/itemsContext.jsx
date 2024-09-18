/* eslint-disable react/prop-types */



import { createContext, useReducer } from 'react';

// Define acciones
export const UPLOAD_ITEMS = 'UPLOAD_ITEMS';

// Define el contexto
export const ItemsContext = createContext();

// Define el reductor
const itemsReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_ITEMS:
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

// Proveedor del contexto
export const ItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(itemsReducer, { items: [] });

    return (
        <ItemsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ItemsContext.Provider>
    );
};



/*import { createContext, useReducer } from "react";


// Estado inicial del contexto
const initialState = {
  items: [] // Inicia con una lista vacía de materiales
};

// se crea el contexto
export const ItemsContext = createContext(initialState);

// Constante para el tipo de acción
export const UPLOAD_ITEMS = 'UPLOAD_ITEMS';

// Reducer que manejará las acciones del contexto
export const ItemsReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_ITEMS:
      return {
        ...state, // Mantén el estado existente
        items: action.payload // Actualiza la lista de items
      };
    default:
      return state; // Devuelve el estado existente por defecto
  }
};

// Proveedor del contexto

export const ItemsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ItemsReducer,{items:[]});

  return (
    <ItemsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};*/






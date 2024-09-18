

import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/NavBar/Navbar';
import AppRoutes from './routes/Routes';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ItemsProvider } from './context/itemsContext';
import { ProveedoresProvider } from './context/ProveedoresContext'; // Importa el contexto de proveedores
import { IngresosProvider } from './context/IngresosContext';
import { AuthProvider } from './context/AuthContext'; 
import { EgresosProvider } from './context/EgresoContext';


function App() {
  return (
    <>
      <Router>
      <AuthProvider>
        <ItemsProvider> 
          
          
            <IngresosProvider>
            <ProveedoresProvider>
            <EgresosProvider>
            <Navbar />
            <AppRoutes />
            </EgresosProvider>
            </ProveedoresProvider>
            </IngresosProvider>
           
        
        </ItemsProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;


/*import {BrowserRouter as Router} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import  Navbar  from './components/NavBar/Navbar'
import AppRoutes from './routes/Routes';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { ItemsContext, ItemsReducer } from './context/itemsContext';
//import { useReducer } from 'react';
import { ItemsProvider } from './context/itemsContext';


function App() {
  return (
    <>
      <Router>
        <ItemsProvider> 
          <Navbar />
          <AppRoutes />
        </ItemsProvider>
      </Router>
    </>
  );
}*/




/*function App() {
  const initialState=[]
const[items, dispatch]=useReducer(ItemsReducer,initialState )

  return (
    <>
    <Router>
    <ItemsContext.Provider value={{items, dispatch}}>
    <Navbar/>
    <AppRoutes/>

    </ItemsContext.Provider>
    </Router>
    
    </>
  )
}*/



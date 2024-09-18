

import { Routes, Route, Navigate } from 'react-router-dom';
import ShowProducts from '../pages/ShowProducts'
import ShowProveedores from '../pages/ShowProveedores'
import ShowIngresos from '../pages/ShowIngresos'
import ShowEgresos from '../pages/ShowEgresos';
import Home from '../pages/Home'
import CreateProduct from '../pages/createProduct'
import CreateProveedores from '../pages/createProveedores'
import CreateIngreso from '../pages/createIngreso';
import CreateEgreso from '../pages/createEgreso';
import Login from '../pages/login';
import PrivateRoute from '../components/login/PrivateRoute';






const AppRoutes = () => {
    const token = localStorage.getItem('token');
    return (
        <>
            <Routes>
            
              <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />  
                
            
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/create" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
                <Route path="/create/proveedores" element={<PrivateRoute><CreateProveedores /></PrivateRoute>} />
                <Route path="/create/ingreso" element={<PrivateRoute><CreateIngreso /></PrivateRoute>} />
                <Route path="/create/egreso" element={<PrivateRoute><CreateEgreso/></PrivateRoute>} />

                <Route path="/show" element={<PrivateRoute><ShowProducts /></PrivateRoute>} />
                <Route path="/show/proveedores" element={<PrivateRoute><ShowProveedores /></PrivateRoute>} />
                <Route path="/show/ingreso" element={<PrivateRoute><ShowIngresos/></PrivateRoute>} />
        
                <Route path="/show/egreso" element={<PrivateRoute><ShowEgresos/></PrivateRoute>} />

          <Route path="*" element={<Navigate to={token ? "/home" : "/"} />} />
            </Routes>
        </>
    );
};

export default AppRoutes;

/*import { Routes, Route, Navigate } from 'react-router-dom';
import ShowProducts from '../pages/ShowProducts'
import Home from '../pages/Home'
import CreateProduct from '../pages/createProduct'
import Login from '../pages/login';
import PrivateRoute from '../components/login/PrivateRoute';

import ShowMaterials from '../pages/ShowMaterials'; // Nueva página para listar materiales
import ShowProviders from '../pages/ShowProviders'; // Nueva página para listar proveedores


import CreateMaterial from '../pages/CreateMaterial'; // Nueva página para crear materiales
import CreateProvider from '../pages/CreateProvider'; // Nueva página para crear proveedores



const AppRoutes = () => {
    const token = localStorage.getItem('token');
    return (
        <>
            <Routes>
                <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/create" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
                <Route path="/create/materiales" element={<PrivateRoute><CreateMaterial /></PrivateRoute>} />
                <Route path="/create/proveedores" element={<PrivateRoute><CreateProvider /></PrivateRoute>} />
                <Route path="/show" element={<PrivateRoute><ShowProducts /></PrivateRoute>} />
                <Route path="/show/materiales" element={<PrivateRoute><ShowMaterials /></PrivateRoute>} />
                <Route path="/show/proveedores" element={<PrivateRoute><ShowProviders /></PrivateRoute>} />
                <Route path="*" element={<Navigate to={token ? "/home" : "/"} />} />
            </Routes>
        </>
    );
};

export default AppRoutes;*/


/*import { Routes, Route} from 'react-router-dom'
import ShowProducts from '../pages/ShowProducts'
import Home from '../pages/Home'
import CreateProduct from '../pages/createProduct'

const AppRoutes = ()=>{
    return(
        <>
     <Routes>
       <Route path='/' element ={<Home/>}/>
        <Route path='/create' element={<CreateProduct/>}/>
        <Route path='/show' element={<ShowProducts/>}/>
        
    </Routes>

        </>
    )
}
export default AppRoutes;*/
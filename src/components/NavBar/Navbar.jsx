
import { Link}  from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavbarBs from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 
import './navbar.css';

const Navbar = () => {
    const { logout } = useContext(AuthContext);  // Usar el contexto de autenticación

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();  
        window.location.href = '/login'; 
    };

    return (
        <NavbarBs bg="dark" variant="dark">
            <Container fluid>
                <NavbarBs.Brand href="#home">Municipalidad de Samayac</NavbarBs.Brand>
                <Nav className="nav-container justify-content-evenly">
                    <Nav.Item>
                        <Link to='/' style={{color:'#fff', textDecoration:'none'}}> Home </Link>
                    </Nav.Item>
                 
                    <NavDropdown title="Crear" id="nav-dropdown-create" style={{color:'#fff'}}>
                        <NavDropdown.Item as={Link} to='/create'>Materiales</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/create/proveedores'>Proveedores</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/create/ingreso'>Ingreso</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/create/egreso'>Egreso</NavDropdown.Item>
                    </NavDropdown>
                
                    <NavDropdown title="Listar" id="nav-dropdown-list" style={{color:'#fff'}}>
                        <NavDropdown.Item as={Link} to='/show'>Materiales</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/show/proveedores'>Proveedores</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/show/ingreso'>Ingresos</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/show/egreso'>Egresos</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <button onClick={handleLogout} style={{color:'#fff', textDecoration:'none', background: 'none', border: 'none'}}> Cerrar Sesión </button>
                    </Nav.Item>
                </Nav>
            </Container>
        </NavbarBs>
    );
};

export default Navbar;









/*import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavbarBs from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <NavbarBs bg="dark" variant="dark">
            <Container fluid>
                <NavbarBs.Brand href="#home">Municipalidad de Samayac</NavbarBs.Brand>
                <Nav className="nav-container justify-content-evenly">
                    <Nav.Item>
                        <Link to='/' style={{color:'#fff', textDecoration:'none'}}> Home </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/create' style={{color:'#fff', textDecoration:'none'}}> Crear </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/show' style={{color:'#fff', textDecoration:'none'}}> Listar </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <button onClick={handleLogout} style={{color:'#fff', textDecoration:'none', background: 'none', border: 'none'}}> Cerrar Sesión </button>
                    </Nav.Item>
                </Nav>
            </Container>
        </NavbarBs>
    );
};

export default Navbar;*/



/*import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import NavbarBs from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './navbar.css'

const Navbar = ()=>{
    return (
   
        <NavbarBs bg="dark" variant="dark">
        <Container fluid>
          <NavbarBs.Brand href="#home">Municipalidad de Samayac</NavbarBs.Brand>
          <Nav className="nav-container justify-content-evenly">
           <Nav.Item>
            <Link to='/' style={{color:'#fff', textDecoration:'none'}}> Home </Link>
           </Nav.Item>
           <Nav.Item>
            <Link to='/create' style={{color:'#fff', textDecoration:'none'}}> Crear </Link>
           </Nav.Item>
           <Nav.Item>
            <Link to='/show' style={{color:'#fff', textDecoration:'none'}}> Listar </Link>
           </Nav.Item>
          </Nav>
        </Container>
      </NavbarBs>

    )
}

export default Navbar;*/

 





 import './Home.css';
 
 const Home = () =>{
    return(
        <div className="home-container" style={{color:'#fff', textDecoration:'none'}} >
        <h1 >Samayac Suchitepequez</h1>
        </div>
    );
}
 export default Home;



 
 /*import { useState } from 'react';
 import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
 
const Home = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const navigate = useNavigate();
 
     const handleLogin = async (e) => {
         e.preventDefault();
         try {
             const response = await axios.post('/login', { email, password });
             localStorage.setItem('token', response.data.token);
             navigate('/Home'); // Redirigir a la página de dashboard u otra según tu necesidad
         } catch (err) {
            console.error('Error en el login:', err.response ? err.response.data : err.message);
             setError('Credenciales incorrectas. Intenta nuevamente.');
         }
     };
 
     return (
         <div>
             <h1>Samayac Suchitepequez</h1>
             <form onSubmit={handleLogin}>
                 <div>
                     <label>Email:</label>
                     <input 
                         type="email" 
                         value={email} 
                         onChange={(e) => setEmail(e.target.value)} 
                         required 
                     />
                 </div>
                 <div>
                     <label>Password:</label>
                     <input 
                         type="password" 
                         value={password} 
                         onChange={(e) => setPassword(e.target.value)} 
                         required 
                     />
                 </div>
                 {error && <p style={{ color: 'red' }}>{error}</p>}
                 <button type="submit">Login</button>
             </form>
         </div>
     );
 };
 
 export default Home;*/
 
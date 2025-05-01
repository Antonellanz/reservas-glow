import { Link } from 'react-router-dom';
import { useState} from 'react';


import './Header.css';

const Header = () => {
  
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1 className="logo-glow">GLOW</h1>
      </Link>
      
      
      
        <div className="auth-buttons-desktop">
         <Link to="/login" className="btn">Iniciar sesión</Link>
          <Link to="/register" className="btn">Crear cuenta</Link>
        </div>
      
  

    
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </div>

    
      <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
       
          <div className="auth-buttons-mobile">
            <Link to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Crear cuenta</Link>
          </div>
      

       
      </nav>
    </header>
  );
};

export default Header;




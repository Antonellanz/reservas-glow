import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const RedirectBasedOnRole = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      const rol = decoded.rol;

      if (rol === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return null;
};

export default RedirectBasedOnRole;

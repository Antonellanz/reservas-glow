import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookSquare } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">GLOW © {new Date().getFullYear()}</div>

      <div className="footer-social">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.png" alt="Instagram" className="icono-red" />
          Instagram
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.png" alt="Facebook" className="icono-red" />
          Facebook
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src="/whatsapp.png" alt="Whatsapp" className="icono-red" />
          WhatsApp
        </a>
      </div>
    </footer>
  );
};

export default Footer;



  
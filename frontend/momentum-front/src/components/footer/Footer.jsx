
import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>SOBRE NOSOTROS</h4>
            <ul>
              <li><a href="#">Empresa</a></li>
              <li><a href="#">Nuestra misión</a></li>
              <li><a href="#">Prensa</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>AYUDA</h4>
            <ul>
              <li><a href="#">Atención al Cliente</a></li>
              <li><a href="#">Tutorial para usar app</a></li>
              <li><a href="#">Formas de Pago</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>SEGUINOS</h4>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Términos y Condiciones</a>
            <a href="#">Política de Privacidad</a>
            <a href="#">Cookies</a>
          </div>
          <div className="footer-locale">
            Argentina | Español
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
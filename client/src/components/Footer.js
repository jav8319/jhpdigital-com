import React, { useState } from 'react';
import { FaYoutube, FaFacebook, FaInstagram, FaXing } from 'react-icons/fa';
import LoginSignUpDialog from './LoginSignUpDialog'; // New component
import { useStoreContext } from '../utils/GlobalState';

function Footer() {
  const [showDialog, setShowDialog] = useState(false);
    const [state,] = useStoreContext();
    const {isloggin} = state;

  const toggleDialog = () => setShowDialog(!showDialog);


  console.log('*******isloggign*******',isloggin);
  return (
    <div className="footer-custom" style={{ margin: '0px' }}>
      <div className="footer-content-custom">
        <div className="follow-us-custom">
          <h4>Síguenos</h4>
          <p>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXing />
            </a>
          </p>
        </div>
        <div className="contact-custom">
          <h4>Contacto</h4>
          <p>Correo: contact@jhpdigital.com</p>
          <p>Tel: +57 (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom-custom">
        <p>
          Created by{' '}
          <a href="https://www.javiermp.com/" target="_blank" rel="noopener noreferrer">
            JMP
          </a>
          <button disabled={isloggin} onClick={toggleDialog} style={{ marginLeft: '10px' }}>
            Access
          </button>
        </p>
        <p>&copy; {new Date().getFullYear()} JHP Digital. All Rights Reserved.</p>
      </div>
      {showDialog && <LoginSignUpDialog toggleDialog={toggleDialog} />}
    </div>
  );
}

export default Footer;





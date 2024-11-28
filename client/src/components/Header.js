import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa'; // Import menu and cart icons
import image1 from '../Assets/J.png';
import image2 from '../Assets/h.png';
import image3 from '../Assets/p.png';
import image4 from '../Assets/d.png';
import image5 from '../Assets/i1.png';
import image6 from '../Assets/g.png';
import image7 from '../Assets/i2.png';
import image8 from '../Assets/t.png';
import image9 from '../Assets/a.png';
import image10 from '../Assets/l.png';

function Header() {
  const [displayedText, setDisplayedText] = useState([]);

  useEffect(() => {
    const text = ['J', 'H', 'P', 'D', 'i', 'g', 'i', 't', 'a', 'l'];
    let index = 0;

    const interval = setInterval(() => {
      const textToAdd = text[index];
      setDisplayedText((prev) => (index === 0 ? [textToAdd] : [...prev, textToAdd]));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky-header-custom">
      <div>
        <img className={`effect-custom ${displayedText.length > 0 ? 'visible-custom' : ''}`} src={image1} alt="J" />
        <img className={`effect-custom ${displayedText.length > 1 ? 'visible-custom' : ''}`} src={image2} alt="H" />
        <img className={`effect-custom ${displayedText.length > 2 ? 'visible-custom' : ''}`} src={image3} alt="P" />
        <img className={`effect-custom ${displayedText.length > 3 ? 'visible-custom' : ''}`} src={image4} alt="D" />
        <img className={`effect-custom ${displayedText.length > 4 ? 'visible-custom' : ''}`} src={image5} alt="I1" />
        <img className={`effect-custom ${displayedText.length > 5 ? 'visible-custom' : ''}`} src={image6} alt="G" />
        <img className={`effect-custom ${displayedText.length > 6 ? 'visible-custom' : ''}`} src={image7} alt="I2" />
        <img className={`effect-custom ${displayedText.length > 7 ? 'visible-custom' : ''}`} src={image8} alt="T" />
        <img className={`effect-custom ${displayedText.length > 8 ? 'visible-custom' : ''}`} src={image9} alt="A" />
        <img className={`effect-custom ${displayedText.length > 9 ? 'visible-custom' : ''}`} src={image10} alt="L" />
      </div>
      <div>
        <div className="cart-container-custom">
          <div className="cart-icon-custom">
            <FaShoppingCart />
          </div>
        </div>
        <div>
          <nav>
            <ul className="nav-menu-custom">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/mantenimiento">Mantenimiento</Link></li>
              <li><Link to="/clases">Clases</Link></li>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/acerca">Acerca</Link></li>
            </ul>
          </nav>
          <div className="nav-links-mobile-custom">
            <div className="cart-container-mobile-custom">
              <div className="cart-icon-mobile-custom">
                <FaShoppingCart />
              </div>
            </div>
            <div className="menu-icon-custom">
              <FaBars />
            </div>
            <div className="nav-menu-burger-custom">
              <Link to="/">Inicio</Link>
              <Link to="/mantenimiento">Mantenimiento</Link>
              <Link to="/clases">Clases</Link>
              <Link to="/tienda">Tienda</Link>
              <Link to="/acerca">Acerca</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

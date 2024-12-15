import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { FaBars, FaShoppingCart } from 'react-icons/fa'; // Import menu and cart icons
import { Api } from "../utils/api";
import { LOGIN_USER } from '../utils/actions';
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
    const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState([]);
  const [state,dispatch] = useStoreContext();
  const { userType, isloggin } = state;


  const handleLogout = async () => {

   // Perform POST request on component moun
        try {
          const response = await Api.post('/user/logout')
          
    
          if (response.status === 200) {
            console.log('Response:', response);
      dispatch({ type: LOGIN_USER, login: false, userType:'' }); 
navigate('/'); // Navigate to the Admin route


          }else{
            console.log('Response:', response);
            alert('An error occurred')
            dispatch({ type: LOGIN_USER, login: false, userType:'' }); 
            navigate('/'); // Navigate to the Admin route
            
          }
        } catch (error) {
          console.error('Error with POST request:', error);
        }finally{
          dispatch({ type: LOGIN_USER, login: false, userType:'' }); 
          navigate('/'); // Navigate to the Admin route
        }
      };
    

    // Component Return Example
  

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
      <div className='custom-title-header'>
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
              <li><Link to="/unirse">Trabaja Con Nosotros</Link></li>
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><Link to="/availability">Disponibilidad</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/mant_admin">Crear Mantenimiento</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/clases_admin">Crear Clases</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/ver_producto">Ver Productos</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/crear_producto">Crear Producto</Link></li>}
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><Link to="/ver_habilidades">Mis Habilidades</Link></li>}
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><Link to="/ver_trabajos">Trabajos</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/ver_ordenes">Ordernes</Link></li>}
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><Link to="/mod_clave">Contrasena</Link></li>}
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><button  onClick={handleLogout}>Cerrar session</button></li>}
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
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/mantenimiento">Mantenimiento</Link></li>
              <li><Link to="/clases">Clases</Link></li>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/acerca">Acerca</Link></li>
              <li><Link to="/unirse">Trabaja Con Nosotros</Link></li>
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><Link to="/availability">Disponibilidad</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/mant_admin">Crear Mantenimiento</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/clases_admin">Crear Clases</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/ver_producto">Ver Productos</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/crear_producto">Crear Producto</Link></li>}
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><Link to="/ver_habilidades">Mis Habilidades</Link></li>}
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><Link to="/ver_trabajos">Trabajos</Link></li>}
              {userType==='admin'&&isloggin===true&&isloggin===true&&<li><Link to="/ver_ordenes">Ordernes</Link></li>}
              {(userType==='admin'||userType==='user')&&isloggin===true&&<li><button  onClick={handleLogout}>Cerrar session</button></li>}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Maint from './pages/Maint';
import Lessons from './pages/Lessons';
import Store from './pages/Store';  
import Availability from './pages/Availability';
import Joinus from './pages/Joinus';
import MaintAdmin from './pages/MaintAdmin';
import LessonsAdmin from './pages/LessonsAdmin';
import Seeproducts from './pages/Seeproducts';
import Createproduct from './pages/Createproducts';
import Myskills from './pages/Myskills';
import Jobstodo from './pages/Jobstodo';
import Shipments from './pages/Shipments';
import Changepass from './pages/ChangePass'
import Resetpass from './pages/Resetpass'

function App() {

  return (
      <Router>
        <main style={{ padding:'0px 0px', margin:'0px 0px'}}>
        <StoreProvider>
          <Header/>
            <Routes> 
               <Route 
                   path='/' 
                    element={<Home />} 
               /> 
               <Route 
                   path='/acerca' 
                    element={<About />} 
               /> 
               <Route 
                   path='/mantenimiento' 
                    element={<Maint />} 
               /> 
               <Route 
                   path='/clases' 
                    element={<Lessons />} 
               /> 
               <Route 
                   path='/tienda' 
                    element={<Store />} 
               /> 
               <Route 
                   path="/unirse" 
                    element={<Joinus/>} 
               /> 
                 <Route 
                path="/availability" 
                element={<Availability />} 
              />
                 <Route 
                path="/mant_admin" 
                element={<MaintAdmin/>} 
              />
                 <Route 
                path="/clases_admin" 
                element={<LessonsAdmin/>} 
              />
                 <Route 
                path="/ver_producto" 
                element={<Seeproducts/>} 
              />
                 <Route 
                path="/crear_producto"
                element={<Createproduct/>} 
              />
                 <Route 
                path="/ver_habilidades"
                element={<Myskills/>} 
              />
                 <Route 
                path="/ver_trabajos" 
                element={<Jobstodo/>} 
              />
                 <Route 
                path="/ver_ordenes" 
                element={<Shipments/>} 
              />
                 <Route 
                path="/mod_clave" 
                element={<Changepass/>} 
              />
                 <Route 
                path="/resetpassword/:token" 
                element={<Resetpass/>} 
              />
                </Routes>
          <Footer />
          </StoreProvider>
        </main>
      </Router>
  );
}

export default App;

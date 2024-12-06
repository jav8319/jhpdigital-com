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
                path="/admin/availability" 
                element={<Availability />} 
              />
                </Routes>
          <Footer />
          </StoreProvider>
        </main>
      </Router>
  );
}

export default App;

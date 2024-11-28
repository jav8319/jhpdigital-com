import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [displayedCard, setDisplayedCard] = useState(false);

  useEffect(() => {
    setDisplayedCard(true);
  }, []);

  const cards = [
    {
      title: 'Mantenimiento/Reparaciones',
      description: 'Realizamos mantenimiento de teléfonos inteligentes, computadoras y redes.',
      imageUrl: 'https://storage.googleapis.com/jhp_digital2024/maint.webp',
      link: '/mantenimiento',
    },
    {
      title: 'Acerca',
      description: 'Conoce acerca de nosotros.',
      imageUrl: 'https://storage.googleapis.com/jhp_digital2024/acerca.webp',
      link: '/acerca',
    },
    {
      title: 'Clases',
      description: 'Programa una clase con nosotros sobre redes, software, hardware y mucho más.',
      imageUrl: 'https://storage.googleapis.com/jhp_digital2024/clases.webp',
      link: '/clases',
    },
    {
      title: 'Tienda',
      description: 'Visita nuestra tienda en línea. Ofrecemos accesorios para teléfonos inteligentes y computadoras.',
      imageUrl: 'https://storage.googleapis.com/jhp_digital2024/tienda.webp',
      link: '/tienda',
    },
  ];

  return (
    <div className="home-custom">
      <div className="card-container-custom">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card-custom ${displayedCard ? 'cardvisible-custom' : ''}`}
            style={{ backgroundImage: `url(${card.imageUrl})` }}
          >
            <div className="card-overlay-custom">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <Link to={card.link} className="card-link-custom">
                Ver
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

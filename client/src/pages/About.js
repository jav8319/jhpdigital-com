import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Acerca() {
  return (
    <div className='custom-bckg-color'>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  <h2 className='custom-card-title'>Acerca de JHP Digital</h2>
                </Card.Title>
                <Card.Text>
                  Hola, estimados usuarios de <strong>JHP Digital</strong>. Nuestro negocio comenzó hace más de 15 años en la ciudad de Cali, Colombia, 
                  cuando nuestro fundador emprendió la tarea de ayudar a amigos a reparar sus celulares y computadoras, además de instalar software. Con el tiempo, 
                  esta labor se convirtió en un negocio que hoy ofrece clases personalizadas de software como Microsoft Office, manejo básico de correo electrónico y computadoras con sistema operativo Windows.
                </Card.Text>
                <Card.Text>
                  Nuestro mayor fuerte es el <strong>mantenimiento de computadoras</strong>, que puedes programar fácilmente con nosotros. También contamos con una tienda donde podrás comprar una variedad de electrónicos y mucho más, con entregas a domicilio en Cali y sus alrededores, además de envíos nacionales.
                </Card.Text>
                <Card.Text>
                  Contamos con técnicos experimentados y capacitados para ofrecerte un servicio de alta calidad en cada área que atendemos. ¡Gracias por confiar en <strong>JHP Digital</strong>!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Acerca;




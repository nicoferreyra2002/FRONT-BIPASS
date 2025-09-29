import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Contact.css";

const developers = [
  {
    name: "Nicolás Ferreyra",
    image: "./../../../public/images/Nicolas.jpg", // cambiar por la foto real
    linkedin: "https://www.linkedin.com/in/nicolas-ferreyra",
    github: "https://github.com/nicoferreyra2002",
    email: "mailto:nicolas@example.com",
  },
  {
    name: "Jonatan Robledo",
    image: "./../../../public/images/Jonatan.jpg",
    linkedin: "https://www.linkedin.com/in/jonatanrobledo",
    github: "https://github.com/jonatanfrobledo",
    email: "mailto:jonatan@example.com",
  },
  {
    name: "María Ángeles Vittone",
    image: "./../../../public/images/Angie.jpg",
    linkedin: "https://www.linkedin.com/in/mariaangelesvittone",
    github: "https://github.com/mariaangelesvittone",
    email: "mailto:maria@example.com",
  },
];

const Contact = () => {
  return (
    <div className="contact-container">
      <Container className="py-5">
        {/* Bienvenida */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Bienvenido al sector de Contacto</h1>
          <p className="lead">
            Esta plataforma fue desarrollada como un <strong>proyecto académico</strong>, 
            con el objetivo de brindar una experiencia innovadora en la 
            gestión y difusión de eventos culturales en Rosario.
          </p>
        </div>

        {/* Equipo de desarrollo */}
        <Row className="mb-5">
          {developers.map((dev, idx) => (
            <Col key={idx} md={4} className="text-center mb-4 animate-fade-in  ">
              <Card className="border-0 bg-transparent">
                <div className="dev-image mx-auto mb-3">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="rounded-circle shadow-lg"
                    width="300"
                    height="300"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{dev.name}</Card.Title>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <a href={dev.linkedin} target="_blank" rel="noreferrer">
                      <FaLinkedin size={28} className="text-primary" />
                    </a>
                    <a href={dev.github} target="_blank" rel="noreferrer">
                      <FaGithub size={28} className="text-dark" />
                    </a>
                    <a href={dev.email}>
                      <FaEnvelope size={28} className="text-danger" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Formulario de contacto */}
        <div className="contact-form bg-white shadow-lg rounded p-4">
          <h3 className="fw-bold mb-4 text-center">¿Querés sumar tu evento?</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="Tu nombre" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="ejemplo@email.com" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción del evento</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Cuéntanos sobre tu evento..." />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="px-4">
                Enviar solicitud
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;

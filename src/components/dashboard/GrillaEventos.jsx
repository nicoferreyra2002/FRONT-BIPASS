import { Card, Row, Col, Container } from "react-bootstrap";
import '../styles/GrillaEventos.css'
const eventos = [
    { id: 1, titulo: "Concierto Rock", imagen: "" },
    { id: 2, titulo: "Festival Jazz", imagen: "" },
    { id: 3, titulo: "Streaming DJ", imagen: "" },
];

const GrillaEventos = () => (
    <Container className="my-5">
        <h2 className="mb-4">Próximos Eventos</h2>
        <Row>
            {eventos.map((evento) => (
                <Col key={evento.id} md={4}>
                    <Card className="mb-4">
                        <Card.Img variant="top" src={evento.imagen} />
                        <Card.Body>
                            <Card.Title>{evento.titulo}</Card.Title>
                            <Card.Text>
                                ¡No te lo pierdas! Reservá tu entrada ahora.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
);

export default GrillaEventos;
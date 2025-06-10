import { Card, Row, Col, Container } from "react-bootstrap";
import '../styles/TiposDeEntradas.css';
const TiposDeEntradas = () => (
    <Container className="my-5">
        <h2 className="mb-4">Tipos de Entradas</h2>
        <Row>
            {["VIP", "GENERAL", "STREAMING"].map((tipo) => (
                <Col key={tipo} md={4}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>{tipo}</Card.Title>
                            <Card.Text>
                                Disfrutá de la mejor experiencia {tipo.toLowerCase()}.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
);

export default TiposDeEntradas;
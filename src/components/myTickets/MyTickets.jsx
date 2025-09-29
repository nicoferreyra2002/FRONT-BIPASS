// src/components/mytickets/MyTickets.jsx
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form, Modal, Alert } from 'react-bootstrap';
import { FaTicketAlt, FaInfoCircle, FaDownload, FaEnvelope, FaTimes } from 'react-icons/fa';
import './MyTickets.css';

// Mock de tickets para demostrar la funcionalidad
const MOCK_TICKETS = [
  {
    id: 1,
    event: 'International Music Festival',
    date: 'October 15, 2025',
    location: 'Parque Independencia, Rosario',
    seat: 'PLATEA A - Fila 3 - Butaca 12',
    price: 4500,
    qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ticket1',
    pdf_url: '#'
  },
  {
    id: 2,
    event: 'Rock Legends Concert',
    date: 'October 22, 2025',
    location: 'Metropolitano, Rosario',
    seat: 'VIP - Fila 1 - Butaca 5',
    price: 5500,
    qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ticket2',
    pdf_url: '#'
  },
  {
    id: 3,
    event: 'Stand-Up Comedy Night',
    date: 'November 5, 2025',
    location: 'Teatro El Círculo, Rosario',
    seat: 'PLATEA B - Fila 5 - Butaca 20',
    price: 3200,
    qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ticket3',
    pdf_url: '#'
  }
];

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simula llamado a API
    setTimeout(() => {
      setTickets(MOCK_TICKETS);
      setLoading(false);
    }, 800);
  }, []);

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setShowModal(false);
  };

  const filteredTickets = tickets.filter(
    t =>
      t.event.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center">
        <div className="text-center text-white">
          <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }} />
          <h4 className="mt-3">Loading your tickets...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="mytickets-container">
      <Container>
        <h2 className="mb-4 text-center">Mis e-Tickets</h2>
        <p className="text-center mb-4">Aquí puedes ver tus entradas adquiridas y gestionarlas.</p>

        {/* Barra de búsqueda */}
        <div className="mytickets-search mb-4 d-flex justify-content-center">
          <InputGroup>
            <InputGroup.Text className="bg-white"><FaInfoCircle /></InputGroup.Text>
            <Form.Control
              placeholder="Buscar por evento o ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>

        {/* Grid de tickets */}
        {filteredTickets.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredTickets.map(ticket => (
              <Col key={ticket.id}>
                <Card className="ticket-card h-100 shadow-lg">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaTicketAlt size={50} className="mb-3 text-primary" />
                    <Card.Title className="text-center">{ticket.event}</Card.Title>
                    <Card.Text className="text-center">{ticket.date}<br />{ticket.location}</Card.Text>
                    <Card.Text className="text-center"><strong>Asiento:</strong> {ticket.seat}</Card.Text>
                    <Button variant="primary" className="mt-auto" onClick={() => handleOpenModal(ticket)}>Ver detalles</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info" className="mytickets-alert">
            <FaInfoCircle className="me-2" />No tienes tickets disponibles.
          </Alert>
        )}

        {/* Modal de ticket */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          {selectedTicket && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedTicket.event}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <img src={selectedTicket.qr_code_url} alt="QR Code" className="mb-3" />
                <p><strong>Fecha:</strong> {selectedTicket.date}</p>
                <p><strong>Ubicación:</strong> {selectedTicket.location}</p>
                <p><strong>Asiento:</strong> {selectedTicket.seat}</p>
                <p><strong>Precio:</strong> ${selectedTicket.price}</p>
                <div className="d-flex justify-content-around mt-3">
                  <Button variant="success" href={selectedTicket.pdf_url} target="_blank">
                    <FaDownload className="me-2" />Descargar PDF
                  </Button>
                  <Button variant="info">
                    <FaEnvelope className="me-2" />Reenviar Email
                  </Button>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  <FaTimes className="me-2" />Cerrar
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </div>
  );
};

export default MyTickets;

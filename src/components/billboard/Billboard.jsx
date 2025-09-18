import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form, Carousel, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import './Billboard.css';

// Example events (in production these would come from an API)
const EVENTS = [
  {
    id: 1,
    title: 'International Music Festival',
    description: 'A unique show with artists from all over the world.',
    date: 'October 15, 2025',
    location: 'Parque Independencia, Rosario',
    image: 'https://tse3.mm.bing.net/th/id/OIP.ATBtU6Xj_5WCh9JvTJoD9wAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 2,
    title: 'Rock Legends Concert',
    description: 'Relive the best rock classics live.',
    date: 'October 22, 2025',
    location: 'Metropolitano, Rosario',
    image: 'https://tse2.mm.bing.net/th/id/OIP.7jkMPXjUJ0WrSSo5LZZaUwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 3,
    title: 'Stand-Up Comedy Night',
    description: 'Laugh non-stop with the funniest comedians.',
    date: 'November 5, 2025',
    location: 'Teatro El Círculo, Rosario',
    image: 'https://s3.wp.wsu.edu/uploads/sites/1927/2021/11/stand-up-comedy-night-dig-signage-792x446.jpg',
  },
  {
    id: 4,
    title: 'Classical Evening',
    description: 'Experience a night of classical music performed by renowned orchestras.',
    date: 'November 12, 2025',
    location: 'Teatro Municipal, Rosario',
    image: 'https://media.wnyc.org/i/800/0/h/85/1/classical_food.jpg',
  },
  {
    id: 5,
    title: 'Jazz & Blues Festival',
    description: 'Smooth jazz and blues performances to relax your soul.',
    date: 'November 20, 2025',
    location: 'Plaza San Martín, Rosario',
    image: 'https://tse4.mm.bing.net/th/id/OIP.oRCA09rRUUgGyn57Vgfi1AHaFu?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 6,
    title: 'Electronic Dance Party',
    description: 'Dance all night to the beats of top DJs.',
    date: 'December 2, 2025',
    location: 'Club Bahía, Rosario',
    image: 'https://images.squarespace-cdn.com/content/v1/5ce2b5be7fc3b40001578ce7/1598282701884-V9CONFY4USVMLDPY347N/image-asset.jpeg',
  },
  {
    id: 7,
    title: 'Food & Wine Expo',
    description: 'Taste exquisite cuisines and discover fine wines from local producers.',
    date: 'December 10, 2025',
    location: 'Centro de Convenciones, Rosario',
    image: 'https://tse3.mm.bing.net/th/id/OIP.XOTSRF90PQMQ_FDB-JEYtQHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 9,
    title: 'Theater Play: "Shadows of Time"',
    description: 'A captivating drama performed by local theater artists.',
    date: 'January 8, 2026',
    location: 'Teatro El Círculo, Rosario',
    image: 'https://wikibio.in/wp-content/uploads/2023/07/Shadows-of-Time.jpg',
  },
  {
    id: 10,
    title: 'Outdoor Cinema Night',
    description: 'Watch classic movies under the stars in a relaxed atmosphere.',
    date: 'January 15, 2026',
    location: 'Parque Alem, Rosario',
    image: 'https://th.bing.com/th/id/R.6ac1ac4b301754fd531fc8b9460c7593?rik=9NhO0RS0w1OI4Q&pid=ImgRaw&r=0',
  },
];

const Billboard = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents(EVENTS);
      setLoading(false);
    }, 800);
  }, []);

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center">
        <div className="text-center text-white">
          <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }} />
          <h4 className="mt-3">Loading events...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="billboard-container">
      <Container>
        {/* Hero Carousel */}
        <Carousel className="billboard-carousel mb-5 shadow-lg rounded animate-fade-in">
          {events.map((event) => (
            <Carousel.Item key={event.id}>
              <img className="d-block w-100 rounded" src={event.image} alt={event.title} />
              <Carousel.Caption>
                <h3 className="fw-bold">{event.title}</h3>
                <p>{event.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Search Bar */}
        <div className="billboard-search mb-4 d-flex justify-content-center animate-fade-in">
          <InputGroup>
            <InputGroup.Text className="bg-white"><FaInfoCircle /></InputGroup.Text>
            <Form.Control
              placeholder="Search events by title, description or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4 animate-stagger">
            {filteredEvents.map((event) => (
              <Col key={event.id}>
                <Card className="event-card h-100 shadow-lg">
                  <Card.Img variant="top" src={event.image} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <div><FaCalendarAlt className="me-2 text-primary" />{event.date}</div>
                    <div><FaMapMarkerAlt className="me-2 text-danger" />{event.location}</div>
                    <Button variant="primary" className="mt-auto">Informacion del evento</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info" className="billboard-alert">
            <FaInfoCircle className="me-2" />
            No events found with the applied filters.
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Billboard;

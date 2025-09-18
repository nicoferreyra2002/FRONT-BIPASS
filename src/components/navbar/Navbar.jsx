import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaTicketAlt, FaHome, FaFilm, FaUser, FaEnvelope, FaGlobe, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

const AppNavbar = ({ onLogout, onLanguageChange }) => {
  return (
    <Navbar expand="lg" variant="dark" className="main-navbar glass-effect sticky-top">
      <Container fluid>
        {/* Izquierda: Logo */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center me-auto">
          <span className="logo-icon me-2 animate-pulse"><FaTicketAlt /></span>
          <span className="main-title gradient-text">BIPASS</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          
          {/* Centro: Links */}
          <Nav className="mx-auto nav-links">
            <Nav.Link as={NavLink} to="/" end className="nav-item-link">
              <FaHome className="me-2" /> Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/billboard" className="nav-item-link">
              <FaFilm className="me-2" /> Cartelera
            </Nav.Link>
            <Nav.Link as={NavLink} to="/etickets" className="nav-item-link">
              <FaUser className="me-2" /> Mis eTickets
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" className="nav-item-link">
              <FaEnvelope className="me-2" /> Contacto
            </Nav.Link>
          </Nav>

          {/* Derecha: Botones */}
          <Nav className="d-flex align-items-center">
            <Button variant="outline-danger" size="sm" className="nav-btn" onClick={onLogout}>
              <FaSignOutAlt className="me-1" /> Logout
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

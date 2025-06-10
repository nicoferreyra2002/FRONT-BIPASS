import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";
import '../styles/Header.css'

const Header = () => {
    return (
        <Navbar expand="lg" className="custom-navbar" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-glow">BIPASS</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto d-flex align-items-center">
                        <Nav.Link as={Link} to="/" className="nav-item-custom">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/eventos" className="nav-item-custom">Eventos</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros" className="nav-item-custom">Sobre Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/entradas" className="nav-item-custom">Mis Entradas</Nav.Link>
                        <Nav.Link as={Link} to="/carrito" className="nav-item-custom">Carrito</Nav.Link>
                        <Nav.Link as={Link} to="/perfil" className="nav-item-custom">Perfil</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
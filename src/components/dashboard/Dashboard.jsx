import { useState, useEffect } from 'react';
import { Button, Alert, Card, Container, Form, InputGroup, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { BsTicketFill, BsFillCreditCardFill, BsExclamationCircleFill } from 'react-icons/bs';
import { FaFilter, FaRedo, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Dashboard.css';

// const ENTRADAS_API_URL = 'https://api.example.com/tickets'; // Reemplazar con URL de la API
const ENTRADAS = [
    {
        id: 1,
        tipo: 'General',
        modalidad: 'Física',
        descripcion: 'Acceso estándar presencial al evento.',
        cantidad: 150,
        color: '#7c3aed',
        precio: 50.0,
    },
    {
        id: 2,
        tipo: 'VIP',
        modalidad: 'Física',
        descripcion: 'Ubicación preferencial y beneficios exclusivos.',
        cantidad: 5,
        color: '#a78bfa',
        precio: 150.0,
    },
    {
        id: 3,
        tipo: 'Streaming',
        modalidad: 'Virtual',
        descripcion: 'Acceso online al evento en vivo.',
        cantidad: 200,
        color: '#818cf8',
        precio: 30.0,
    },
];

const Dashboard = ({ onLogout, userName }) => {
    const [entradas, setEntradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [filtro, setFiltro] = useState('todas');
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        loadEntradas();
    }, []);

    const loadEntradas = async () => {
        try {
            setLoading(true);
            setError(null);
            await new Promise(resolve => setTimeout(resolve, 700));
            setEntradas(ENTRADAS);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar las entradas. Intenta de nuevo.');
            setEntradas([]);
            setLoading(false);
        }
    };

    const testBackendConnection = async () => {
        setTestResult('Probando conexión...');
        try {
            const response = await axios.get(ENTRADAS_API_URL);
            if (response.status === 200) {
                setTestResult(`✅ Conexión exitosa! Tipos de entradas: ${response.data.length}`);
            } else {
                setTestResult('❌ Falló la conexión al backend.');
            }
        } catch (err) {
            setTestResult('❌ Error al conectar con el backend.');
        }
    };

    const getEstadoEntrada = cantidad => {
        if (cantidad <= 0) return { texto: 'Agotada', color: '#dc3545', icono: <FaExclamationTriangle /> };
        if (cantidad > 0 && cantidad <= 10) return { texto: '¡Pocas unidades!', color: '#ffc107', icono: <BsExclamationCircleFill /> };
        return { texto: 'Disponible', color: '#28a745', icono: <BsTicketFill /> };
    };

    const entradasFiltradas = entradas
        .filter(e => {
            const estado = getEstadoEntrada(e.cantidad);
            if (filtro === 'disponibles') return estado.texto === 'Disponible';
            if (filtro === 'agotadas') return estado.texto === 'Agotada';
            if (filtro === 'pocas_unidades') return estado.texto === '¡Pocas unidades!';
            return true;
        })
        .filter(e => e.tipo.toLowerCase().includes(busqueda.toLowerCase()) || e.descripcion.toLowerCase().includes(busqueda.toLowerCase()));

    if (loading) {
        return (
            <div className="dashboard-bg loading-container animate-fade-in d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #1573bbff 100%)' }}>
                <div className="text-center">
                    <div className="spinner-border text-light animate-pulse" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <h4 className="mt-3 text-white">Cargando tus entradas...</h4>
                    <p className="text-white-50">Preparando todo para ti</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: "linear-gradient(135deg, #ffffffff 0%, #124b77ff 100%)", minHeight: '100vh', padding: '2rem' }}>

            {/* --- Video Principal y Bienvenida --- */}
            <div className="dashboard-video mb-4">
                <video src="/gifs/Dashboard.mp4" 
                autoPlay 
                muted 
                loop 
                className="video-bg rounded" />
                <div className="video-overlay text-center">
                    <h1 className="welcome-title">Bienvenido a BIPASS {userName}</h1>
                    <p className="welcome-subtitle">Explora los eventos y consigue tu entrada</p>
                    <Button variant="light" className="mt-3" onClick={() => window.scrollTo({ top: document.querySelector('.tipos-entradas-container').offsetTop, behavior: 'smooth' })}>
                        Ver entradas
                    </Button>
                </div>
            </div>

            {/* --- Buscador y Filtros --- */}
            <Container className="dashboard-container mb-4">
                <div className="mb-4 d-flex flex-wrap gap-3 align-items-center animate-fade-in">
                    <InputGroup className="search-input" style={{ maxWidth: '500px' }}>
                        <InputGroup.Text className="bg-white"><BsTicketFill /></InputGroup.Text>
                        <Form.Control
                            placeholder="Buscar entradas por tipo o descripción..."
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                        />
                    </InputGroup>
                    <Dropdown onSelect={eventKey => setFiltro(eventKey)}>
                        <Dropdown.Toggle variant="light" id="dropdown-filter">
                            Filtro: {filtro === 'todas' ? 'Todas' : filtro === 'disponibles' ? 'Disponibles' : filtro === 'pocas_unidades' ? 'Pocas unidades' : 'Agotadas'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="todas">Todas</Dropdown.Item>
                            <Dropdown.Item eventKey="disponibles">Disponibles</Dropdown.Item>
                            <Dropdown.Item eventKey="pocas_unidades">Pocas unidades</Dropdown.Item>
                            <Dropdown.Item eventKey="agotadas">Agotadas</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {testResult && (
                        <span className={`badge ${testResult.includes('éxito') ? 'bg-success' : 'bg-danger'} animate-scale-in`}>
                            {testResult}
                        </span>
                    )}
                </div>

                {/* --- Mensajes de Error o Info --- */}
                {error && (
                    <Alert variant="warning" className="alert-modern animate-slide-in mb-4">
                        <div className="d-flex align-items-center">
                            <FaExclamationTriangle className="me-2" /> <strong>Advertencia:</strong> {error}
                        </div>
                        <Button variant="link" className="p-0 mt-2 text-dark" onClick={loadEntradas}>
                            <FaRedo className="me-2" /> Reintentar
                        </Button>
                    </Alert>
                )}
                {entradas.length === 0 && !error && (
                    <Alert variant="info" className="alert-modern animate-slide-in mb-4">
                        <div className="d-flex align-items-center">
                            <FaInfoCircle className="me-2" /> <strong>¡No hay tipos de entradas cargados!</strong>
                        </div>
                        <p className="mb-0 mt-2">Contacta a soporte para agregar nuevas modalidades.</p>
                    </Alert>
                )}
            </Container>

            {/* --- Entradas --- */}
            <Container className="tipos-entradas-container py-4">
                <h2 className="text-center mb-4">Entradas disponibles</h2>
                <div className="entradas-row animate-stagger row g-3">
                    {entradasFiltradas.length > 0 ? (
                        entradasFiltradas.map(entrada => {
                            const estado = getEstadoEntrada(entrada.cantidad);
                            return (
                                <div key={entrada.id} className="col-12 col-md-6 col-lg-4 d-flex">
                                    <Card className="entrada-card shadow-lg w-100 h-100 border-0 hover-lift animate-fade-in" style={{ borderColor: entrada.color, borderLeft: `5px solid ${entrada.color}` }}>
                                        <Card.Body className="d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="mb-0 fw-bold" style={{ color: entrada.color }}>{entrada.tipo}</h5>
                                                <span className="badge" style={{ backgroundColor: estado.color, color: 'white' }}>
                                                    {estado.icono} {estado.texto}
                                                </span>
                                            </div>
                                            <Card.Subtitle className="mb-2 text-muted">{entrada.modalidad}</Card.Subtitle>
                                            <Card.Text className="flex-grow-1">{entrada.descripcion}</Card.Text>
                                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                                <span className="h4 fw-bold mb-0">${entrada.precio.toFixed(2)}</span>
                                                <Button variant="primary" style={{ backgroundColor: entrada.color, borderColor: entrada.color }}>
                                                    <BsFillCreditCardFill className="me-2" /> Comprar
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    ) : (
                        <Alert variant="info" className="alert-modern animate-slide-in mt-4 w-100 text-center">
                            <FaInfoCircle className="me-2" /> No se encontraron entradas con los filtros aplicados.
                        </Alert>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Dashboard;

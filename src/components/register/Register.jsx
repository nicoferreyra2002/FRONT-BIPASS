import { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        fechaNacimiento: "",
        genero: "",
        terminos: false
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: val });
    };

    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validarPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nombre, apellido, email, password, fechaNacimiento, genero } = formData;

        if (!nombre || !apellido || !email || !password || !fechaNacimiento || !genero) {
            setError("Todos los campos son obligatorios.");
            setSuccess(false);
            return;
        }

        if (!validarEmail(email)) {
            setError("El correo electrónico no es válido.");
            setSuccess(false);
            return;
        }

        if (!validarPassword(password)) {
            setError("La contraseña debe tener al menos una mayúscula, una minúscula y un caracter especial.");
            setSuccess(false);
            return;
        }
        if (!formData.terminos) {
            setError("Debes aceptar los términos y condiciones.");
            setSuccess(false);
            return;
        }
        setError("");
        setSuccess(true);
        setTimeout(() => navigate("/"), 2000);
    };

    return (
        <Container className="register-container fade-in">
            <Card className="card-custom w-100" style={{ maxWidth: '480px' }}>
                <Card.Body className="card-body-flex">
                    <h2 className="text-center mb-4 fw-bold">REGISTRARSE</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">¡Registro exitoso!</Alert>}

                    <Form onSubmit={handleSubmit} className="form-gap">
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="input-style" />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="input-style" />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} className="input-style" />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} className="input-style" />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="input-style" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Género</Form.Label>
                            <Form.Select name="genero" value={formData.genero} onChange={handleChange} className="input-style">
                                <option value="">Seleccionar</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                                <option value="no-decidir">Prefiero no decirlo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                name="terminos"
                                label="Acepto los terminos y condiciones"
                                checked={formData.terminos}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <p className="text-center mt-3 text-muted">
                            ¿Ya tenés cuenta? <Link to="/" className="login-link">Iniciar sesión</Link>
                        </p>
                        <Button variant="dark" type="submit" className="w-100 mt-2">
                            Registrarse
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
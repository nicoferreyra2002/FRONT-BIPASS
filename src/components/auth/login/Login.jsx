import { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            setSuccess(false);
            return;
        }

        if (email === "admin@demo.com" && password === "123456") {
            setError("");
            setSuccess(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } else {
            setError("Credenciales incorrectas.");
            setSuccess(false);
        }
    };

    return (
        <Container
            className="login-container d-flex justify-content-center align-items-center vh-100 fade-in"
        >
            <div className="form-wrapper">
                <Card className="p-4 shadow-lg rounded-4 bg-light">
                    <Card.Body>
                        <h2 className="text-center mb-4 fw-bold">INICIAR SESION</h2>

                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">¡Login exitoso!</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ej: admin@demo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-style"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ej: 123456"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-style"
                                />
                            </Form.Group>

                            <div className="d-grid gap-2 mb-2">
                                <Button variant="dark" type="submit">
                                    Iniciar sesión
                                </Button>
                            </div>

                            <p className="text-center mt-3 text-muted">
                                ¿No tenés cuenta?{" "}
                                <Link to="/register" className="register-link">
                                    Registrate aca
                                </Link>
                            </p>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default Login;

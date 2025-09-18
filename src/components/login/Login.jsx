import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: false,
        }));
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            password: false,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email) {
            alert("Debe ingresar un email.");
            emailRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                email: true,
            }));
            return;
        }
        if (!password) {
            alert("Debe ingresar un password.");
            passwordRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                password: true,
            }));
            return;
        }
        if (onLogin) {
            onLogin(email, password);
        }
    };

    return (
        <Row className="g-0 vh-100">
            <Col md={8} className="d-flex align-items-center justify-content-center bg-dark">
                <video
                    src="/gifs/video.mp4"
                    alt="Video de fondo para login"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    autoPlay
                    loop
                    muted
                />
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(150deg, #1097cdff 0%, #170635ff 100%)" }}>
                <Card className="p-5 shadow" style={{ minWidth: 400, maxWidth: 400 }}>
                    <Card.Body>
                        <Row className="mb-4 text-center">
                            <h5 className="display-10 fw-bold">¡BIENVENIDOS A BIPASS!</h5>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className={errors.email ? "border border-danger" : ""}
                                    type="text"
                                    placeholder="Ingresar email"
                                    onChange={handleChangeEmail}
                                    value={email}
                                    ref={emailRef}
                                />
                                {errors.email &&
                                    <p className="text-danger mt-2">Debe completar el campo email</p>}
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className={errors.password && "border border-danger"}
                                    type="password"
                                    placeholder="Ingresar contraseña"
                                    onChange={handleChangePassword}
                                    value={password}
                                    ref={passwordRef}
                                />
                                {errors.password &&
                                    <p className="text-danger mt-2">Debe completar el campo password</p>}
                            </FormGroup>
                            <Row className="mb-3">
                                <Col className="d-flex justify-content-end">
                                    <Button variant="dark" type="submit">
                                        Iniciar sesión
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <hr />
                        <Row className="text-center mb-3">
                            <Col>
                                <p className="mb-0 lead">
                                    ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                                </p>
                            </Col>
                        </Row>
                        <hr />
                        <Row className="text-center mt-3">
                            <Col>
                                <p className="lead">Descarga la aplicación</p>
                                <div className="d-flex justify-content-center gap-3">
                                    <Button
                                        as="a"
                                        href="URL_DE_GOOGLE_PLAY_STORE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outline-dark"
                                        className="rounded-pill d-flex align-items-center gap-2"
                                    >
                                        <i className="bi bi-google-play"></i> Android
                                    </Button>
                                    <Button
                                        as="a"
                                        href="URL_DE_APPLE_APP_STORE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outline-dark"
                                        className="rounded-pill d-flex align-items-center gap-2"
                                    >
                                        <i className="bi bi-apple"></i> iOS
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
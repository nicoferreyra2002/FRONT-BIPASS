import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        birthdate: false,
    });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const birthdateRef = useRef(null);

    const validatePassword = (pwd) => {
        // Valida que la contraseña contenga al menos:
        // - 1 mayúscula
        // - 8 caracteres
        // - 1 carácter especial
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
        const isLongEnough = pwd.length >= 8;
        return hasUpperCase && hasSpecialChar && isLongEnough;
    };

    const handleChange = (setter, ref) => (event) => {
        setter(event.target.value);
        if (event.target.value) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [event.target.name]: false,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let formIsValid = true;
        const newErrors = {
            name: !name,
            email: !email,
            password: !password,
            birthdate: !birthdate,
        };

        if (newErrors.name) {
            alert("Debe ingresar un nombre y apellido.");
            nameRef.current.focus();
            formIsValid = false;
        } else if (newErrors.email) {
            alert("Debe ingresar un email.");
            emailRef.current.focus();
            formIsValid = false;
        } else if (newErrors.password) {
            alert("Debe ingresar una contraseña.");
            passwordRef.current.focus();
            formIsValid = false;
        } else if (newErrors.birthdate) {
            alert("Debe ingresar una fecha de nacimiento.");
            birthdateRef.current.focus();
            formIsValid = false;
        }

        if (password && !validatePassword(password)) {
            alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.");
            passwordRef.current.focus();
            newErrors.password = true;
            formIsValid = false;
        }

        setErrors(newErrors);

        if (formIsValid) {
            if (onRegister) {
                onRegister({ name, email, password, birthdate });
            }
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
                            <h5 className="display-10 fw-bold">¡REGÍSTRATE EN BIPASS!</h5>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            {/* Campo de Nombre y Apellido */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className={errors.name ? "border border-danger" : ""}
                                    type="text"
                                    name="name"
                                    placeholder="Nombre y apellido"
                                    onChange={handleChange(setName, nameRef)}
                                    value={name}
                                    ref={nameRef}
                                />
                                {errors.name && <p className="text-danger mt-2">Debe completar su nombre y apellido</p>}
                            </FormGroup>

                            {/* Campo de Email */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className={errors.email ? "border border-danger" : ""}
                                    type="email"
                                    name="email"
                                    placeholder="Ingresar email"
                                    onChange={handleChange(setEmail, emailRef)}
                                    value={email}
                                    ref={emailRef}
                                />
                                {errors.email && <p className="text-danger mt-2">Debe completar el campo email</p>}
                            </FormGroup>

                            {/* Campo de Contraseña */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className={errors.password ? "border border-danger" : ""}
                                    type="password"
                                    name="password"
                                    placeholder="Ingresar contraseña"
                                    onChange={handleChange(setPassword, passwordRef)}
                                    value={password}
                                    ref={passwordRef}
                                />
                                {errors.password && <p className="text-danger mt-2">La contraseña debe tener 8 caracteres, mayúscula y carácter especial.</p>}
                            </FormGroup>

                            {/* Campo de Fecha de Nacimiento */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className={errors.birthdate ? "border border-danger" : ""}
                                    type="date"
                                    name="birthdate"
                                    onChange={handleChange(setBirthdate, birthdateRef)}
                                    value={birthdate}
                                    ref={birthdateRef}
                                />
                                {errors.birthdate && <p className="text-danger mt-2">Debe ingresar su fecha de nacimiento</p>}
                            </FormGroup>

                            {/* Botón de Registro */}
                            <Row className="mb-3">
                                <Col className="d-flex justify-content-end">
                                    <Button variant="dark" type="submit">
                                        Registrarse
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <hr />
                        <Row className="text-center mt-3">
                            <Col>
                                <p className="mb-0 lead">
                                    ¿Ya tienes una cuenta? <br /> <Link to="/">Iniciar sesión</Link>
                                </p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;
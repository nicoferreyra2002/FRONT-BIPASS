
import Header from "../header/Header";
import { Container } from "react-bootstrap";
import { Fragment } from "react";

const MainLayout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <Container fluid style={{ paddingTop: '2rem', minHeight: '100vh', backgroundColor: '#121212', color: '#fff' }}>
                {children}
            </Container>
        </Fragment>
    );
};

export default MainLayout;

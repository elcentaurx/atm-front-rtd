import { Outlet, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Layout = () => {
  return (
    <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Banco</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link  href="/">Inicio</Nav.Link>
                    <Nav.Link  href="/request">Consultas</Nav.Link>
                    <Nav.Link  href="/create">Crear</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <Outlet />
    </>
  )
};

export default Layout;
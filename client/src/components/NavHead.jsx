import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavHead() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Auth</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function CustomLink({ to, children, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === to ? "active" : ""} >
            <Link to={to} {...props} >
                {children}
            </Link>
        </li>
    );
}

export default NavHead;
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const AppBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Spotify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={"nav-link"} to={"/song"}>Song</NavLink>
            <NavLink className={"nav-link"} to={"/artist"}>Artist</NavLink>
            <NavLink className={"nav-link"} to={"/favorites"}>Favorites</NavLink>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
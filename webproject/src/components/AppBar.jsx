import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "../styles/AppBar.css"
import logo from "../assets/logo.png";

const AppBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
      <Navbar.Brand href="/" className="d-flex align-items-center navbar-brand">
          <img
            src={logo}
            alt="Spotify Logo"
            width="30"
            height="30"
            className="me-2"
          />
          Spotify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
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
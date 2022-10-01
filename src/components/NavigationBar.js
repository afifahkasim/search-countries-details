import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../index.css';
import { BsGlobe2, BsMoonStarsFill } from "react-icons/bs";
import { IconContext } from "react-icons";

function NavigationBar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" className="text-left">
            <IconContext.Provider value={{ size: "3vh", className: "icon" }}><BsGlobe2 /></IconContext.Provider>
            World Countries
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="text-right">
              <IconContext.Provider value={{ size: "2.3vh", className: "icon" }}><BsMoonStarsFill /></IconContext.Provider>
              Dark Mode
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
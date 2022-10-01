import { useContext } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../index.css';
import { BsGlobe2, BsMoonStarsFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { ThemeContext } from "../styles/ThemeContext"


function NavigationBar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const handleTheme = () => {
    setDarkMode(!darkMode)
    console.log(darkMode)
  }

  return (
    <>
      <Navbar className={ darkMode ? 'navbar' : 'navbar-dark'}>
        <Container>
          <Navbar.Brand href="/" className="text-left">
            <IconContext.Provider value={{ size: "3vh", className: "icon" }}><BsGlobe2 /></IconContext.Provider>
            World Countries
          </Navbar.Brand>
          <Nav>
            <div className="nav-link text-right" onClick={handleTheme}>
              <IconContext.Provider value={{ size: "2.3vh", className: "icon" }}><BsMoonStarsFill /></IconContext.Provider>
              Dark Mode
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
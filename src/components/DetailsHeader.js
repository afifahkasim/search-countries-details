import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import React from "react";
import { MdOutlineArrowRight } from "react-icons/md";
import { IconContext } from "react-icons";
import { useContext } from "react"
import { ThemeContext } from '../styles/ThemeContext'

function DetailsHeader(props) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={ darkMode ? 'details' : 'details dark'}>
            <Container className="container-1">
                <Container className="text">
                    <h1>{props.officialName}</h1>
                    <a href="/" className="sub">Countries</a>
                    <a> <IconContext.Provider value={{ size: "3vh", className: "icon" }}><MdOutlineArrowRight /></IconContext.Provider> </a>
                    <a>{props.commonName}</a>
                </Container>
            </Container>
        </div>
    );

}

export default DetailsHeader;

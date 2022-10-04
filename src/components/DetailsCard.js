import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ThemeContext } from "../styles/ThemeContext"


function Subcard(props) {
    return (
        <Card className="subcard-style">
            <Card.Body>
                <span className="title">{props.title}</span><br />
                <span className="subtitle">{props.subtitle}</span>
            </Card.Body>
        </Card>
    )
}

function DetailsCard(props) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={ darkMode ? 'details' : 'details dark'}>
            <Container className="container-2">
                <Card className="card-style">
                    <Row xs={1} md={2}>
                        <Col xs={12} md={5}>
                            <Card className="subcard-style align-items-center">
                                <Card.Img variant="top" className='img' src={props.img} />
                                <Card.Body><strong>National Flag of {props.commonName}</strong></Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={7}>
                            <Row>
                                <Col>
                                    <Subcard title="Native Name" subtitle={props.nativeName} />
                                    <Subcard title="Population" subtitle={props.population} />
                                    <Subcard title="Region" subtitle={props.region} />
                                    <Subcard title="Sub Region" subtitle={props.subRegion} />
                                </Col>
                                <Col>
                                    <Subcard title="Top Level Domain" subtitle={props.tld} />
                                    <Subcard title="Currencies" subtitle={props.currencies} />
                                    <Subcard title="Language" subtitle={props.language} />
                                    <Subcard title="Capital" subtitle={props.capital} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    )
}

export default DetailsCard;
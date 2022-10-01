import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
    return (
        <div className='details'>
            <Container className="container-2">
                <Card className="card-style">
                    <Row xs={1} md={2}>
                        <Col xs={12} md={5}>
                            <Card className="subcard-style align-items-center">
                                <Card.Img variant="top" className='img' src={props.img} />
                                <Card.Body><strong>National Flag of {props.commonName}</strong></Card.Body>
                            </Card>
                            {/* {Object.hasOwn(props.country, 'borders') ?
                                <div className="below-card">
                                    <p>Neighbouring countries: </p>
                                    {props.borders.map((element, idx) => {
                                        return (
                                            <div className="btn btn-secondary btn-sm" key={element}
                                            onClick={() => {
                                                
                                            }}>
                                                {element}
                                            </div>
                                        )
                                    })}
                                </div> : <></>} */}
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
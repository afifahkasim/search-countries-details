import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function CardView(props) {
    return (
        <>
            <Container>
                <Row xs={4} className="g-4">
                    {props.array.map((element, idx) => (
                        <Col key={idx}>
                            <Card>
                                {/* <Container className='img-container'> */}
                                <Card.Img variant="top" className='img' src={element.flags.png} />
                                {/* </Container> */}
                                <Card.Body>
                                    <Card.Title>{element.name.common}</Card.Title>
                                    <Card.Text>
                                        <strong>Population: </strong>{element.population.toLocaleString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Region: </strong>{element.region}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Capital: </strong>{element.capital}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default CardView;
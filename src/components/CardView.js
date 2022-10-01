import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { ThemeContext } from '../styles/ThemeContext'

function CardView(props) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <>
            <Container className='card-container'>
                <Row xs={1} sm={2} md={4} className="row g-4">
                    {props.array.map((element, idx) => (
                        <Col key={idx}>
                            <Card className={ darkMode ? 'bg-light h-100' : 'bg-dark h-100'}>
                                {/* <Container className='img-container'> */}
                                <Link to={`/details/${element.cca3}`} state={{ country: element }} key={idx}>
                                <Card.Img variant="top" className='img' src={element.flags.png} />
                                </Link>
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
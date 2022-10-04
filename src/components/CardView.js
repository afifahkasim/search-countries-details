import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { ThemeContext } from '../styles/ThemeContext'
import SortArrow from './SortArrow'

function CardView(props) {
    const { darkMode } = useContext(ThemeContext);

    // const noCountries = props.array.status || props.array.message; //TODO: Display 0 data when props.array.status === 404

    return (
        <>
            <Container className='card-container'>
                <Container className='sort-container'>
                    <p>Found {props.array.length} countries</p>
                    <div className='sort'>
                        <span onClick={props.onClickSort}>Country
                            {(props.selectedColumn === null || props.selectedColumn !== 'Country') && <SortArrow direction={null} />}
                            {props.selectedColumn === 'Country' && <SortArrow direction={props.direction} />}
                        </span>
                        <span onClick={props.onClickSort}>Population
                            {(props.selectedColumn === null || props.selectedColumn !== 'Population') && <SortArrow direction={null} />}
                            {props.selectedColumn === 'Population' && <SortArrow direction={props.direction} />}</span>
                    </div>
                </Container>
                <Row xs={1} sm={2} md={4} className="row g-4">
                    {props.array.map((element, idx) => (
                        <Col key={idx}>
                            <Link to={`/details/${element.cca3}`} state={{ country: element }} key={idx} className='link'>
                                <Card className={darkMode ? 'bg-light h-100' : 'bg-dark h-100'}>
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
                            </Link>

                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default CardView;
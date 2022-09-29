import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import '../index.css';


function SearchInput(props) {
    return (
        <>
            <Form className='search'>
                <Container>
                    <Form.Group>
                        {/* <Form.Label>Search for a country</Form.Label> */}
                        <InputGroup>
                                <InputGroup.Text>
                                    <IconContext.Provider value={{ size: "2vh", className: "icon" }}><BsSearch /></IconContext.Provider>
                                </InputGroup.Text>
                            <Form.Control type="email" placeholder={props.placeholder} onChange={props.onChange} />
                        </InputGroup>
                    </Form.Group>
                </Container>
            </Form>
        </>
    );
}

export default SearchInput;
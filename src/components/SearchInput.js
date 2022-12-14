import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import '../index.css';

import { useContext } from "react"
import { ThemeContext } from '../styles/ThemeContext'

function SearchInput(props) {
    const { darkMode } = useContext(ThemeContext);
    return (
        <>
            <Form className={darkMode ? 'search' : 'search dark'}>
                <Container>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Text>
                                <IconContext.Provider value={{ size: "2vh", className: "icon" }}><BsSearch /></IconContext.Provider>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder={props.placeholder} onChange={props.onChange}/>
                        </InputGroup>
                    </Form.Group>
                </Container>
            </Form>
        </>
    );
}

export default SearchInput;
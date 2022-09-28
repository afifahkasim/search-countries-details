import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import '../index.css';


function SearchInput(props) {
    return (
        <>
            <Form className='search'>
                <Container>
                    <Form.Group>
                        {/* <Form.Label>Search for a country</Form.Label> */}
                        <Form.Control type="email" placeholder={props.placeholder} onChange={props.onChange} />
                    </Form.Group>
                </Container>
            </Form>
        </>
    );
}

export default SearchInput;
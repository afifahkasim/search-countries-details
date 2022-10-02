import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { useContext } from "react"
import { ThemeContext } from '../styles/ThemeContext'

function DropdownList(props) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <>
            {/* <ButtonGroup className={darkMode ? "dd" : "dd-dark"}> */}
                <Dropdown onSelect={props.onSelect}>
                    {/* <Dropdown.Toggle variant="light" id="dropdown-basic-button">
                    {props.title}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {props.array.map((element, idx) => (
                        <Dropdown.Item eventKey={element} key={idx}>{element}</Dropdown.Item>
                    ))}
                </Dropdown.Menu> */}

                    <DropdownButton size="md" id="dropdown-basic-button" title={props.title} className={darkMode ? "dd" : "dd-dark"}>
                        {props.array.map((element, idx) => (
                            <Dropdown.Item eventKey={element} key={idx}>{element}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Dropdown>
            {/* </ButtonGroup> */}
        </>
    );
}

export default DropdownList;
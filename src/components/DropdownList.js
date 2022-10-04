import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useContext } from "react"
import { ThemeContext } from '../styles/ThemeContext'

function DropdownList(props) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <>
            <Dropdown onSelect={props.onSelect}>
                <DropdownButton size="md" id="dropdown-basic-button" title={props.title} className={darkMode ? "dd" : "dd-dark"}>
                    {props.array.map((element, idx) => (
                        <Dropdown.Item eventKey={element} key={idx}>{element}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </Dropdown>
        </>
    );
}

export default DropdownList;
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownList(props) {

    return (
        <>
            <DropdownButton size="md" id="dropdown-basic-button" title="Filter by Region">
                {props.array.map((element, idx) => (
                    <Dropdown.Item key={idx} href={"#/action-" + idx}>{element}</Dropdown.Item>
                ))}
            </DropdownButton>
        </>
    );
}

export default DropdownList;
import { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Toggle from 'react-toggle'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-toggle/style.css"
import '../index.css';
import { ThemeContext } from '../styles/ThemeContext'

function ToggleLabel(props) {
    const { darkMode } = useContext(ThemeContext);

    // const [toggle, setToggle] = useState(false)

    return (
        <div className='toggle align-items-center'>
            <span className='text left'>Card</span>
            {/* <Toggle checked={toggle} icons={false} onChange={click => setToggle(click.target.checked)} /> */}
            <Toggle checked={props.state} icons={false} onChange={props.onChange} />
            <span className='text right'>List</span>
        </div>
    );
}

export default ToggleLabel;
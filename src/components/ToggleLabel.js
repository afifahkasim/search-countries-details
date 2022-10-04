import Toggle from 'react-toggle'
import "react-toggle/style.css"
import '../index.css';

function ToggleLabel(props) {

    return (
        <div className='toggle align-items-center'>
            <span className='text left'>Card</span>
            <Toggle checked={props.state} icons={false} onChange={props.onChange} />
            <span className='text right'>List</span>
        </div>
    );
}

export default ToggleLabel;
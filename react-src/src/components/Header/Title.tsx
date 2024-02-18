import './index.css'

import { Link } from 'react-router-dom';

const Title = (): JSX.Element => {
    return (
        <div className="comic-logo">
            <Link to="/"></Link>
        </div>
    );
}

export default Title;
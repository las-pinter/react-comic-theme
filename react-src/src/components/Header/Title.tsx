import { Link } from 'react-router-dom';

import './index.css'

const Title = (): JSX.Element => {
    return (
        <div className="comic-logo">
            <Link to="/"></Link>
        </div>
    );
}

export default Title;
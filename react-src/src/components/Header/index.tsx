import Navbar from '../Navbar'
import Title from './Title';

import './index.css'

const Header = (): JSX.Element => {
    return (
        <header className="container-vertical">
            <Title />
            <Navbar />
        </header>
    );
}

export default Header;
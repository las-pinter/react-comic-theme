import './index.css'
import { ThreeDots } from 'react-loader-spinner'

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import Navbar from '../Navbar/Navbar'
import Title from './Title';

interface IHeaderProps extends IConsumerProps { };

const Header = ({ context }: IHeaderProps): JSX.Element => {
    return (
        <header className="container-vertical">
            <Title />
            <div className="loader-wrapper">
                <ThreeDots
                    visible={context.loading}
                    height="30"
                    width="50"
                    color="#ff5100"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
            <Navbar />
        </header>
    );
}

export default WithConsumer(Header);
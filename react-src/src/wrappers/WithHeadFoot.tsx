import Header from '../components/Header';
import Footer from '../components/Footer';

import type { IProps } from '../context/Context';

const WithHeadFoot = (WrappedComponent: (props: IProps) => JSX.Element) => {
    return function (props: IProps) {
        return (
            <>
                <Header />
                <WrappedComponent {...props} />
                <Footer />
            </>
        );
    };
}

export default WithHeadFoot;
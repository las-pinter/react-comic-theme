import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const WithHeadFoot = (WrappedComponent) => {
    return function (props) {
        return (
            <>
                <Header />
                    { <WrappedComponent {...props} /> }
                <Footer />
            </>
        );
    };
}

export default WithHeadFoot;
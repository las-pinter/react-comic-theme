import React from 'react';

import Header from '../components/Header';
import TheLoop from '../components/TheLoop';
import Footer from '../components/Footer';
import { Provider } from '../context/Context'
import GetCurrentRouteData from '../hooks/CommonHooks';

const Comic = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData} >
            <div className="comic-page">
                <Header></Header>
                <div className="content-area">
                    <TheLoop></TheLoop>
                </div>
                <Footer></Footer>
            </div>
        </Provider>
    )

}
export default Comic;
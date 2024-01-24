import React from 'react';

import Header from '../components/Header';
import TheLoop from '../components/TheLoop';
import Footer from '../components/Footer';
import { Provider } from '../context/Context'
import GetCurrentRouteData from '../hooks/CommonHooks';

const Page = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData} >
            <div className="page-single">
                <Header></Header>
                <div className="content-area">
                    <TheLoop></TheLoop>
                </div>
                <Footer></Footer>
            </div>
        </Provider>
    )

}
export default Page;
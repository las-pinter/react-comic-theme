import React from 'react';

import GetCurrentRouteData from '../hooks/CommonHooks';
import Header from '../components/Header';
import TheLoop from '../components/TheLoop';
import Pager from '../components/Pager';
import Footer from '../components/Footer';
import { Provider } from '../context/Context';
import ComicSelector from '../components/ComicSelector';

const MainPage = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData}>
            <div className="main-page">
                <Header></Header>
                <div className="content-area">
                    <h1>This is still a WIP site</h1>
                    <ComicSelector />
                    <TheLoop />
                    <Pager />
                </div>
                <Footer></Footer>
            </div>
        </Provider>
    )
}

export default MainPage;

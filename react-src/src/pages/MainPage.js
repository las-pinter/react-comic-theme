import React from 'react';

import GetCurrentRouteData from '../hooks/CommonHooks';
import { Provider } from '../context/Context';

import ThePosts from '../components/ThePosts';
import Pager from '../components/Pager';
import ComicSelector from '../components/ComicSelector';

const MainPage = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData}>
            <div className="main-page">
                <div className="content-area">
                    <h1>This is still a WIP site</h1>
                    <ComicSelector />
                    <ThePosts />
                    <Pager />
                </div>
            </div>
        </Provider>
    )
}

export default MainPage;

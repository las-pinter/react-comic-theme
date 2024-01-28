import React from 'react';

import GetCurrentRouteData from '../hooks/CommonHooks';
import { Provider } from '../context/Context';

import TheComic from '../components/TheComic';
import ThePost from '../components/ThePost';

const Comic = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData} >
            <div className="comic-page">
                <div className="content-area">
                    <TheComic />
                    <ThePost index={0} />
                </div>
            </div>
        </Provider>
    )

}
export default Comic;
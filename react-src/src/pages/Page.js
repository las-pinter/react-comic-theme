import React from 'react';

import GetCurrentRouteData from '../hooks/CommonHooks';
import { Provider } from '../context/Context';

import ThePage from '../components/ThePage';


const Page = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData} >
            <div className="page-single">
                <div className="content-area">
                    <ThePage index={0} />
                </div>
            </div>
        </Provider>
    )

}
export default Page;
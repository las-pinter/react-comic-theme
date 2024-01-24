import React from 'react';

import Header from '../components/Header';
import TheLoop from '../components/TheLoop';
import Footer from '../components/Footer';
import { Provider } from '../context/Context'
import GetCurrentRouteData from '../hooks/CommonHooks';

const Post = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData} >
            <div className="post-single">
                <Header></Header>
                <div className="content-area">
                    <TheLoop></TheLoop>
                </div>
                <Footer></Footer>
            </div>
        </Provider>
    )

}
export default Post;
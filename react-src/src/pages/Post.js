import React from 'react';

import GetCurrentRouteData from '../hooks/CommonHooks';
import { Provider } from '../context/Context';

import ThePost from '../components/ThePost';

const Post = () => {
    const routeData = GetCurrentRouteData();

    return (
        <Provider router={routeData} >
            <div className="post-single">
                <div className="content-area">
                    <ThePost index={0} />
                </div>
            </div>
        </Provider>
    )

}
export default Post;
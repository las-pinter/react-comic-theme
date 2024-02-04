import React from 'react';

import WithHeadFoot from './WithHeadFoot';
import WithProvider from '../context/WithProvider';

import ThePost from '../components/ThePost';

import "./index.css";

const Post = () => {
    return (
        <div className="post-single container-vertical">
            <div className="content-wrapper container-vertical">
                <ThePost index={0} />
            </div>
        </div>
    )

}
export default WithProvider(WithHeadFoot(Post));
import React from 'react';

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
export default Post;
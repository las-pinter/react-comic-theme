import React from 'react';

import ThePost from '../components/ThePost';

import "./index.css";

const Post = () => {
    return (
        <div className="post-single container-vertical">
            <ThePost index={0} />
        </div>
    )

}
export default Post;
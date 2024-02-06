import React from 'react';

import TheComic from '../components/TheComic';
import ThePost from '../components/ThePost';

import "./index.css";

const Comic = () => {
    return (
        <div className="comic-page container-vertical">
            <TheComic />
            <ThePost index={0} />
        </div>
    )

}
export default Comic;
import React from 'react';

import WithHeadFoot from './WithHeadFoot';
import WithProvider from '../context/WithProvider';

import TheComic from '../components/TheComic';
import ThePost from '../components/ThePost';

import "./index.css";

const Comic = () => {
    return (
        <div className="comic-page container-vertical">
            <div className="content-wrapper container-vertical">
                <TheComic />
                <ThePost index={0} />
            </div>
        </div>
    )

}
export default WithProvider(WithHeadFoot(Comic));
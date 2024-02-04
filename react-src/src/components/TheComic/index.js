import React from 'react';
import WithConsumer from '../../context/WithConsumer';
import ComicNavigator from '../ComicNavigator';

import './index.css';

const TheComic = ({ context }) => {
    if (context.appError) {
        return <div className="app-error">{context.appError}</div>;
    }
    if (context.posts.length === 0) {
        return <div className="no-results"></div>;
    }

    const comicPost = context.posts[0];

    let comicImageUrl = '';
    if (comicPost._embedded) {
        if (comicPost._embedded['wp:featuredmedia']) {
            comicImageUrl = comicPost._embedded['wp:featuredmedia'][0].source_url;
        }
    }

    return (
        <div className="the-comic-container">
            <div className="navigator-top">
                <ComicNavigator />
            </div>
            <div className="the-comic">
                <img src={comicImageUrl} alt="Name of the Comic" />
            </div>
            <div className="navigator-bottom">
                <ComicNavigator />
            </div>
        </div>
    );
};

export default WithConsumer(TheComic);
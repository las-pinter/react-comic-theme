import React from 'react';
import WithConsumer from '../../context/WithConsumer';
import ComicNavigator from '../ComicNavigator';

const TheComic = ({ index, context }) => {
    const post = context.posts[index];

    let comicImageUrl = '';
    if (post._embedded) {
        if (post._embedded['wp:featuredmedia']) {
            comicImageUrl = post._embedded['wp:featuredmedia'][0].source_url;
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
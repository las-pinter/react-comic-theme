import React from 'react';
import WithConsumer from '../../wrappers/WithConsumer';

import ComicNavigator from '../ComicNavigator';

import Fader from '../../effects/Fader';

import './index.css';

const TheComic = ({ context }) => {
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
                <Fader depend={context.posts}>
                    <img src={comicImageUrl} alt="Name of the Comic" />
                </Fader>
            </div>
            <div className="navigator-bottom">
                <ComicNavigator />
            </div>
        </div>
    );
};

export default WithConsumer(TheComic);
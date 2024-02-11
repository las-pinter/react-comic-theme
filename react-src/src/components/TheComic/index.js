import React from 'react';
import WithConsumer from '../../wrappers/WithConsumer';

import ComicNavigator from './ComicNavigator';

import Fader from '../../effects/Fader';

import './index.css';
import Characters from './Characters';

const TheComic = ({ context }) => {
    if (context.posts.length === 0) {
        return;
    }

    const comicPost = context.posts[0];

    if (comicPost.type !== 'comic') {
        return;
    }

    let comicImageUrl = '';
    if (comicPost._embedded) {
        if (comicPost._embedded['wp:featuredmedia']) {
            comicImageUrl = comicPost._embedded['wp:featuredmedia'][0].source_url;
        }
    }

    return (
        <div className="the-comic-container">
            <div className="navigator-top">
                <ComicNavigator currentComic={context.currentComic}/>
            </div>
            <div className="the-comic">
                <Fader depend={context.posts}>
                    <img src={comicImageUrl} alt={comicPost.title.rendered} />
                </Fader>
            </div>
            <div className="navigator-bottom">
                <ComicNavigator currentComic={context.currentComic}/>
            </div>
            <Characters comicPost={comicPost} />
        </div>
    );
};

export default WithConsumer(TheComic);
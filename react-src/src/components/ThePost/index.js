import React from 'react';
import { Link } from 'react-router-dom';

import WithConsumer from '../../context/WithConsumer';
import PostMeta from '../PostMeta';

import './index.css';

const ThePost = ({ index, context }) => {
    if (context.appError) {
        return <div className="app-error">{context.appError}</div>;
    }
    if (context.posts.length === 0) {
        return <div className="no-results"></div>;
    }

    const post = context.posts[index];

    let linkPrefix = '';
    switch (post.type) {
        case 'comic':
            linkPrefix = '/comic/';
            break;
        case 'post':
        default:
            linkPrefix = '/';
            break;
    }

    let linkSlug = post.slug;
    let theContent = '';

    switch (context.contextType) {
        case 'comic':
            theContent = post.content.rendered;
            linkPrefix = '/comic/';
            linkSlug = context.currentComic.comicFullSlug;
            break;
        case 'mainPage':
        case 'post':
            theContent = post.content.rendered;
            break;
        default:
            theContent = '';
            break;
    }

    return (
        <div id={'post-id-' + post.id} className={'post-item'}>
            <h1><Link to={linkPrefix + linkSlug}>{decodeURIComponent(post.title.rendered)}</Link></h1>
            <PostMeta index={index} />
            <div className="post-content" dangerouslySetInnerHTML={{ __html: theContent }}></div>
        </div>
    );
};

export default WithConsumer(ThePost);
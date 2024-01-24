import React from 'react';
import { Link } from 'react-router-dom';
import WithConsumer from '../context/WithConsumer';
import PostMeta from './PostMeta';
import TheComic from './TheComic';

const ThePost = ({ index, context }) => {
    const post = context.posts[index];

    let linkPrefix = '';
    switch (post.type) {
        case 'page':
            linkPrefix = '/page/';
            break;
        case 'post':
            linkPrefix = '/';
            break;
        case 'comic':
            linkPrefix = '/comic/';
            break;
        default:
            linkPrefix = '/';
            break;
    }

    let linkSlug = post.slug;
    let theContent = '';
    let comic = '';

    switch (context.contextType) {
        case 'mainPage':
            theContent = post.excerpt ? post.excerpt.rendered : "No Excerpt";
            break;
        case 'comic':
            theContent = post.content.rendered;
            linkPrefix = '/comic/';
            linkSlug = context.comicFullSlug;
            comic = < TheComic index={index} />;
            break;
        case 'post':
        case 'page':
            theContent = post.content.rendered;
            break;
        default:
            theContent = '';
            break;
    }

    return (
        <div id={'post-id-' + post.id} className={'post-item'}>
            <h1><Link to={linkPrefix + linkSlug}>{post.title.rendered}</Link></h1>
            <PostMeta index={index} />
            {comic}
            <div className="post-content" dangerouslySetInnerHTML={{ __html: theContent }}></div>
        </div>
    );
};

export default WithConsumer(ThePost);
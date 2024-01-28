import React from 'react';
import { Link } from 'react-router-dom';
import WithConsumer from '../../context/WithConsumer';
import PostMeta from '../PostMeta';

const ThePage = ({ index, context }) => {
    if (context.appError) {
        return <div className="app-error">{context.appError}</div>;
    }
    if (context.posts.length === 0) {
        return <div className="no-results"></div>;
    }

    const page = context.posts[index];
    const linkPrefix = '/page/';
    const linkSlug = page.slug;
    const theContent = page.content.rendered;

    return (
        <div id={'page-id-' + page.id} className="post-item">
            <h1><Link to={linkPrefix + linkSlug}>{page.title.rendered}</Link></h1>
            <PostMeta index={index} />
            <div className="page-content" dangerouslySetInnerHTML={{ __html: theContent }}></div>
        </div>
    );
};

export default WithConsumer(ThePage);
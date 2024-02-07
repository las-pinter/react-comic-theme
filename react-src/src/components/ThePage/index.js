import React from 'react';
import { Link } from 'react-router-dom';
import WithConsumer from '../../context/WithConsumer';
import ComicArchive from './ComicArchive';

const ThePage = ({ index, context }) => {
    if (context.appError) {
        return <div className="app-error">{context.appError}</div>;
    }
    if (context.posts.length === 0) {
        return <div className="no-results"></div>;
    }

    const page = context.posts[index];
    const comicArchive = context.comics.find(comic => comic["archivePage"] === page.slug);

    let theContent = '';

    if (comicArchive) {
        theContent = <ComicArchive comicSlug={comicArchive.comicSlug} />;
    } else {
        theContent = <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>;
    }

    return (
        <div id={'page-id-' + page.id} className="post-item">
            <h1><Link to={'/page/' + page.slug}>{page.title.rendered}</Link></h1>
            {theContent}
        </div>
    );
};

export default WithConsumer(ThePage);
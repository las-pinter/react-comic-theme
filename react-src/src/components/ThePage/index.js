import React, {
    useRef
} from 'react';
import { Link } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';

import WithConsumer from '../../wrappers/WithConsumer';

import ComicArchive from './ComicArchive';
import DisqusComments from '../DisqusComments';

import './index.css';

const ThePage = ({ index, context }) => {
    const nodeRef = useRef(null);

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
        <>
            <CSSTransition
                classNames="page"
                timeout={300}
                nodeRef={nodeRef}
                appear={true}
                in={!context.loadingComponents.post}
            >
                <div ref={nodeRef} className="page-wrapper container-vertical">
                    <div id={'page-id-' + page.id} className="page-item">
                        <h1><Link to={'/page/' + page.slug}>{page.title.rendered}</Link></h1>
                        {theContent}
                    </div>
                    <DisqusComments post={page} display={!context.loadingComponents.post} />
                </div>
            </CSSTransition>
        </>
    );
};

export default WithConsumer(ThePage);
import React from 'react';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import WithConsumer from '../../wrappers/WithConsumer';

const ComicArchive = ({ context, comicSlug }) => {
    useEffect(() => {
        context.getComicArchive(comicSlug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (context.appError) {
        return <div className="app-error">{context.appError}</div>;
    }
    if (context.posts.length === 0) {
        return <div className="no-results"></div>;
    }

    let content = context.comicArchive.map(function (chapter, i) {
        let chapterComicArchive = chapter['comics'].map(function (comic, j) {
            return (
                <div key={comic['slug'] + '_' + i} className="chapter-comic-archive-comic">
                    <Link to={comic['permalink']}>
                        <div className="chapter-comic-archive-number"></div>
                        <div className="chapter-comic-archive-comicname">{comic['name']}</div>
                    </Link>
                </div>
            );
        });

        return (
            <div key={chapter['slug'] + '_' + i}>
                <div className="chapter-name">{chapter['name']}</div>
                <div className="chapter-comic-archive">
                    {chapterComicArchive}
                </div>
            </div>
        );
    })

    return (
        <div className="comic-archive">
            {content}
        </div>
    );
};

export default WithConsumer(ComicArchive);
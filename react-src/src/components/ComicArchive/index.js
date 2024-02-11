import React, { useState } from 'react';
import { useEffect } from "react";

import WithConsumer from '../../wrappers/WithConsumer';
import ArchiveChapter from './ArchiveChapter';

import './index.css';

const ComicArchive = ({ context, comicSlug }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        context.getComicArchive(comicSlug).then(() => {
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicSlug])

    if (context.comicArchive.length === 0 || loading) {
        return <div className="no-results"></div>;
    }

    return (
        <div className="comic-archive container-vertical">
            {
                context.comicArchive.map((chapter, i) => {
                    return (
                        <ArchiveChapter
                            key={chapter['slug'] + '_' + i}
                            chapter={chapter}
                        />
                    )
                })
            }
        </div>
    );
};

export default WithConsumer(ComicArchive);
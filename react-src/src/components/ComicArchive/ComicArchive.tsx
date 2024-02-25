import './index.css';

import { useState, useEffect } from 'react';

import ArchiveChapter from './ArchiveChapter';
import RestHandler from '../../rest/RestHandler';

interface IComicArchiveProps {
    comicSlug: string
}

const ComicArchive = ({ comicSlug }: IComicArchiveProps): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [comicArchive, setComicArchive] = useState([]);

    useEffect(() => {
        setLoading(true);
        let url = '/wp-json/comics/v1/comicarchive/' + comicSlug;
        RestHandler.get(url).then((response) => {
            setComicArchive(response.data);
            setLoading(false);
        }).catch(() => {
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicSlug])

    if (comicArchive.length === 0 || loading) {
        return <></>;
    }

    return (
        <div className="comic-archive container-vertical">
            {
                comicArchive.map((chapter, i) => {
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

export default ComicArchive;
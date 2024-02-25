import './index.css';

import { useState, useEffect } from 'react';

import ArchiveChapter from './ArchiveChapter';
import RestHandler from '../../rest/RestHandler';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

interface IComicArchiveProps extends IConsumerProps {
    comicSlug?: string
}

const ComicArchive = ({ context, comicSlug }: IComicArchiveProps): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [comicArchive, setComicArchive] = useState([]);

    useEffect(() => {
        setLoading(true);
        context.addLoading();
        let url = '/wp-json/comics/v1/comicarchive/' + comicSlug;
        RestHandler.get(url).then((response) => {
            setComicArchive(response.data);
        }).catch(() => {
        }).finally(() => {
            setLoading(false);
            context.removeLoading();
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

export default WithConsumer(ComicArchive);
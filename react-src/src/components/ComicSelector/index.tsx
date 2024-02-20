import './index.css';

import { useEffect, useState } from 'react';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import ComicSelectorNavigator from './ComicSelectorNavigator';
import Axios from 'axios';

interface IComicSelectorProps extends IConsumerProps { }

const ComicSelector = ({ context }: IComicSelectorProps): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [selectorImages, setSelectorImages] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        setLoading(true);
        let url = '/wp-json/settings/v1/selector_images';
        Axios.get(url).then((response) => {
            setSelectorImages(response.data);
            setLoading(false);
        }).catch(() => {
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!selectorImages || loading) {
        return <></>;
    }

    return (
        <div className="comic-selector container-horizontal">
            {
                Object.keys(context.comics).map((comicSlug, i) => {
                    let comic = context.comics[comicSlug];
                    return (
                        <div key={comicSlug + '_' + i} className={"comic-selector-comic container-vertical " + comicSlug}>
                            <div className="comic-name">{comic.name}</div>
                            <div className="comic-selector-image">
                                <img src={ selectorImages[comicSlug] } alt={comic.name} />
                            </div>
                            <div className="comic-selector-navigation container-horizontal">
                                <ComicSelectorNavigator link={comic.firstPage} text={'First'} />
                                <ComicSelectorNavigator link={'page/' + comic.archivePage} text={'Archive'} />
                                <ComicSelectorNavigator link={comic.lastPage} text={'Last'} />
                            </div>
                        </div>
                    )
                })
            }
        </div >
    );
};

export default WithConsumer(ComicSelector);
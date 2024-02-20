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
                context.comics.map((item, i) => {
                    return (
                        <div key={item.comicSlug + '_' + i} className={"comic-selector-comic container-vertical " + item.comicSlug}>
                            <div className="comic-name">{item.name}</div>
                            <div className="comic-selector-image">
                                <img src={ selectorImages[item.comicSlug] } alt={item.name} />
                            </div>
                            <div className="comic-selector-navigation container-horizontal">
                                <ComicSelectorNavigator link={item.firstPage} text={'First'} />
                                <ComicSelectorNavigator link={'page/' + item.archivePage} text={'Archive'} />
                                <ComicSelectorNavigator link={item.lastPage} text={'Last'} />
                            </div>
                        </div>
                    )
                })
            }
        </div >
    );
};

export default WithConsumer(ComicSelector);
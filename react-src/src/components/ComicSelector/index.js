import React,
{
    useEffect,
} from 'react';

import WithConsumer from '../../wrappers/WithConsumer';
import ComicSelectorNavigator from './ComicSelectorNavigator';

import './index.css';

const ComicSelector = ({ context }) => {
    useEffect(() => {
        context.getComics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="comic-selector container-horizontal">
            {
                context.comics.map((item, i) => {
                    return (
                        <div key={item.comicSlug + '_' + i} className={"comic-selector-comic container-vertical " + item.comicSlug}>
                            <div className="comic-name">{item.name}</div>
                            <div className="selector-image">
                                <img src="" alt={item.name} />
                            </div>
                            <div className="selector-navigation container-horizontal">
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
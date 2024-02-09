import React,
{ useEffect } from 'react';
import { Link } from 'react-router-dom';

import WithConsumer from '../../wrappers/WithConsumer';

import './index.css';

const ComicSelector = ({ context }) => {
    useEffect(() => {
        context.getComics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="comic-selector container-horizontal">
            {
                context.comics.map(function (item, i) {
                    return (
                        <div key={item.comicSlug + '_' + i} className={"comic-selector-comic container-vertical " + item.comicSlug}>
                            <div className="comic-name">{item.name}</div>
                            <div className="selector-image">
                                <img src="" alt={item.name} />
                            </div>
                            <div className="selector-navigation container-horizontal">
                                <Link to={item.firstPage} className="comic-selector-nav comic-selector-nav-first">
                                    First
                                </Link>
                                <Link to={'page/' + item.archivePage} className="comic-selector-nav comic-selector-nav-archive">
                                    Archive
                                </Link>
                                <Link to={item.lastPage} className="comic-selector-nav comic-selector-nav-last">
                                    Last
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default WithConsumer(ComicSelector);
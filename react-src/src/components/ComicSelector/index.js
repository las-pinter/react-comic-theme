import React from 'react';
import { Link } from 'react-router-dom';

import WithConsumer from '../../context/WithConsumer';

const ComicSelector = ({ index, context }) => {
    return (
        <div className="comic-selector">
            {
                context.comics.map(function (item, i) {
                    return (
                        <div key={i} className={"comic-selector-comic " + item['chapterSlug']}>
                            <div className="comic-name"></div>
                            <div>
                                <Link to={item['lastPage']} className="comic-selector-nav">Last</Link>
                                <Link to={item['firstPage']} className="comic-selector-nav">First</Link>
                                <Link to={'archives/' + item['chapterSlug']} className="comic-selector-nav">Archive</Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default WithConsumer(ComicSelector);
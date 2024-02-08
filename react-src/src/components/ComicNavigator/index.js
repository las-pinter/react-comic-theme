import React from 'react';
import { Link } from 'react-router-dom';

import WithConsumer from '../../wrappers/WithConsumer';

import './index.css';

const ComicNavigator = ({ context }) => {
    let firstComicPage = context.currentComic.firstPage;
    let previousComicPage = context.currentComic.previousPage;
    let nextComicPage = context.currentComic.nextPage;
    let lastComicPage = context.currentComic.lastPage;

    return (
        <ul className="comic-navigator container-horizontal">
            <li className="comic-navigator-item"><Link to={firstComicPage}>First</Link></li>
            <li className="comic-navigator-item"><Link to={previousComicPage}>Previous</Link></li>
            <li className="comic-navigator-item"><Link to={nextComicPage}>Next</Link></li>
            <li className="comic-navigator-item"><Link to={lastComicPage}>Last</Link></li>
        </ul>
    );
};

export default WithConsumer(ComicNavigator);
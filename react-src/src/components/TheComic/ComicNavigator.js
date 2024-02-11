import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const ComicNavigator = ({ currentComic }) => {
    let firstComicPage = currentComic.firstPage;
    let previousComicPage = currentComic.previousPage;
    let nextComicPage = currentComic.nextPage;
    let lastComicPage = currentComic.lastPage;

    return (
        <ul className="comic-navigator container-horizontal">
            <li className="comic-navigator-item"><Link to={firstComicPage}>First</Link></li>
            <li className="comic-navigator-item"><Link to={previousComicPage}>Previous</Link></li>
            <li className="comic-navigator-item"><Link to={nextComicPage}>Next</Link></li>
            <li className="comic-navigator-item"><Link to={lastComicPage}>Last</Link></li>
        </ul>
    );
};

export default ComicNavigator;
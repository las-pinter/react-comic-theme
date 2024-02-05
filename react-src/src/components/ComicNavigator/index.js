import React from 'react';
import { Link } from 'react-router-dom';

import WithConsumer from '../../context/WithConsumer';

import './index.css';

const ComicNavigator = ({ context }) => {
    let firstComicPage = context.comicFirstPage;
    let previousComicPage = context.comicPreviousPage;
    let nextComicPage = context.comicNextPage;
    let lastComicPage = context.comicLastPage;

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
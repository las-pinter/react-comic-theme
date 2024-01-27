import React from 'react';
import WithConsumer from '../../context/WithConsumer';
import { Link } from 'react-router-dom';

const ComicNavigator = ({ context }) => {
    let firstComicPage = context.comicFirstPage;
    let previousComicPage = context.comicPreviousPage;
    let nextComicPage = context.comicNextPage;
    let lastComicPage = context.comicLastPage;

    return (
        <div className="navigator">
            <div><Link to={firstComicPage}>First</Link></div>
            <div><Link to={previousComicPage}>Previous</Link></div>
            <div><Link to={nextComicPage}>Next</Link></div>
            <div><Link to={lastComicPage}>Last</Link></div>
        </div>
    );
};

export default WithConsumer(ComicNavigator);
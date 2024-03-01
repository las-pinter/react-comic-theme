import { NavigationIcons } from '../../Icons';
import './index.css';

import { Link } from 'react-router-dom';

export type TComicNavigatorProps = {
    firstPage: string,
    previousPage: string,
    nextPage: string,
    lastPage: string
}

export interface IComicNavigatorProps {
    comicNavLinks: TComicNavigatorProps
}

const ComicNavigator = ({ comicNavLinks }: IComicNavigatorProps) => {
    let firstComicPage = comicNavLinks.firstPage;
    let previousComicPage = comicNavLinks.previousPage;
    let nextComicPage = comicNavLinks.nextPage;
    let lastComicPage = comicNavLinks.lastPage;

    return (
        <div className="comic-navigator container-horizontal container-style">
            <Link to={firstComicPage} className="comic-navigator-item">
                {NavigationIcons.first}
                <span className="comic-navigator-text">First</span>
            </Link>
            <Link to={previousComicPage} className="comic-navigator-item">
                {NavigationIcons.previous}
                <span className="comic-navigator-text">Previous</span>
            </Link>
            <Link to={nextComicPage} className="comic-navigator-item">
                <span className="comic-navigator-text">Next</span>
                {NavigationIcons.next}
            </Link>
            <Link to={lastComicPage} className="comic-navigator-item">
                <span className="comic-navigator-text">Last</span>
                {NavigationIcons.last}
            </Link>
        </div>
    );
};

export default ComicNavigator;
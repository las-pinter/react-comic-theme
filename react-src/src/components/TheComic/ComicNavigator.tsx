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
                {NavigationIcons.first}First
            </Link>
            <Link to={previousComicPage} className="comic-navigator-item">
                {NavigationIcons.previous}Previous
            </Link>
            <Link to={nextComicPage} className="comic-navigator-item">
                Next{NavigationIcons.next}
            </Link>
            <Link to={lastComicPage} className="comic-navigator-item">
                Last{NavigationIcons.last}
            </Link>
        </div>
    );
};

export default ComicNavigator;
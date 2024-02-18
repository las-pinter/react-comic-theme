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
        <ul className="comic-navigator container-horizontal">
            <li className="comic-navigator-item"><Link to={firstComicPage}>First</Link></li>
            <li className="comic-navigator-item"><Link to={previousComicPage}>Previous</Link></li>
            <li className="comic-navigator-item"><Link to={nextComicPage}>Next</Link></li>
            <li className="comic-navigator-item"><Link to={lastComicPage}>Last</Link></li>
        </ul>
    );
};

export default ComicNavigator;
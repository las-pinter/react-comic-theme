import { Link } from "react-router-dom";

import { ComicItem } from "./ArchiveChapter";

import './index.css';
import Fader from "../../effects/FadeSwitchLoader";

interface IArchiveComicItemProps {
    comic: ComicItem,
    number: number
}

const ArchiveComicItem = ({ comic, number }: IArchiveComicItemProps): JSX.Element => {
    return (
        <Fader depend={number}>
            <Link to={comic.permalink}>
                <div className="archive-comic-item">
                    <div className="archive-comic-item-thumbnail">
                        {
                            comic.thumbnail ?
                                <img
                                    src={comic.thumbnail}
                                    alt={comic.name}
                                /> :
                                <div className="gray-placeholder"></div>
                        }
                    </div>
                    <div className="archive-comic-item-name-wrapper container-vertical">
                        <div className="archive-comic-item-name">
                            {comic.name}
                        </div>
                    </div>
                    <div className="archive-comic-item-number-wrapper">
                        <div className="archive-comic-item-number">{number}</div>
                    </div>
                </div>
            </Link>
        </Fader>
    );
};

export default ArchiveComicItem;
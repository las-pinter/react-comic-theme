import './index.css';

import { ForwardedRef, forwardRef } from "react";
import { Link } from "react-router-dom";

export type TComicItem = {
    name: string,
    slug: string,
    permalink: string,
    thumbnail: string
}

export interface IComicItemNodeRef extends TComicItem {
    nodeRef: React.MutableRefObject<any>
}

interface IArchiveComicItemProps {
    comic: TComicItem,
    number: number
}

export const ArchiveComicItem = forwardRef(({ comic, number }: IArchiveComicItemProps, ref: ForwardedRef<any>): JSX.Element => {
    return (
        <Link ref={ref} className="archive-comic-item-wrapper" to={comic.permalink}>
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
                    <div className="archive-comic-item-name" title={comic.name}>
                        {comic.name}
                    </div>
                </div>
                <div className="archive-comic-item-number-wrapper">
                    <div className="archive-comic-item-number">{number}</div>
                </div>
            </div>
        </Link>
    );
});

interface ICharacterComicItemProps {
    comic: TComicItem
}

export const CharacterComicItem = forwardRef(({ comic }: ICharacterComicItemProps, ref: ForwardedRef<any>): JSX.Element => {
    return (
        <Link ref={ref} className="character-comic-item-wrapper" to={comic.permalink}>
            <div className="character-comic-item">
                <div className="character-comic-item-thumbnail">
                    {
                        comic.thumbnail ?
                            <img
                                src={comic.thumbnail}
                                alt={comic.name}
                            /> :
                            <div className="gray-placeholder"></div>
                    }
                </div>
                <div className="character-comic-item-name-wrapper container-vertical">
                    <div className="character-comic-item-name" title={comic.name}>
                        {comic.name}
                    </div>
                </div>
            </div>
        </Link>
    );
});

export default ArchiveComicItem;
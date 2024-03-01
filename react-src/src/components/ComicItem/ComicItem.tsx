import './index.css';

import { ForwardedRef, forwardRef, useState } from "react";
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

const getHoverClass = (hoverItem: number) => {
    switch (hoverItem) {
        case 0:
            return "";
        case 1:
            return " hovered";
        case 2:
            return " non-hovered";
        default:
            return "";
    }
}

export const ArchiveComicItem = forwardRef(({ comic, number }: IArchiveComicItemProps, ref: ForwardedRef<any>): JSX.Element => {
    const [hover, setHover] = useState(0);

    return (
        <Link
            ref={ref}
            className={"archive-comic-item-wrapper" + getHoverClass(hover)}
            to={comic.permalink}
            onMouseEnter={() => {
                setHover(1)
            }}
            onMouseLeave={() => {
                setHover(2)
            }}
        >
            <div
                className={"archive-comic-item" + getHoverClass(hover)}
            >
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
                <div
                    className={"archive-comic-item-name-wrapper container-vertical" + getHoverClass(hover)}
                >
                    <div
                        className={"archive-comic-item-name" + getHoverClass(hover)}
                        title={comic.name}
                    >
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
    const [hover, setHover] = useState(0);

    return (
        <Link
            ref={ref}
            className={"character-comic-item-wrapper" + getHoverClass(hover)}
            to={comic.permalink}
            onMouseEnter={() => {
                setHover(1)
            }}
            onMouseLeave={() => {
                setHover(2)
            }}
        >
            <div
                className={"character-comic-item" + getHoverClass(hover)}
            >
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
                <div
                    className={"character-comic-item-name-wrapper container-vertical" + getHoverClass(hover)}
                >
                    <div
                        className={"character-comic-item-name" + getHoverClass(hover)}
                        title={comic.name}
                    >
                        {comic.name}
                    </div>
                </div>
            </div>
        </Link>
    );
});

export default ArchiveComicItem;
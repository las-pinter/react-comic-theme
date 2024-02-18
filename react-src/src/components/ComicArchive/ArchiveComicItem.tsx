import './index.css';

import { useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { ComicItem } from "./ArchiveChapter";

interface IArchiveComicItemProps {
    comic: ComicItem,
    number: number
}

const ArchiveComicItem = ({ comic, number }: IArchiveComicItemProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                classNames="fader"
                timeout={3000}
                nodeRef={nodeRef}
                appear={true}
                addEndListener={(done: () => void) => {
                    nodeRef.current?.addEventListener("transitionend", done, false);
                }}
                key={number}
            >
                <Link ref={nodeRef} to={comic.permalink}>
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
            </CSSTransition>
        </SwitchTransition>
    );
};

export default ArchiveComicItem;
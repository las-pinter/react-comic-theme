import './index.css';

import { useRef } from "react";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import ArchiveComicItem from "./ArchiveComicItem";

export type ComicItem = {
    name: string,
    slug: string,
    permalink: string,
    thumbnail: string
}

interface IArchiveChapterProps {
    chapter: {
        name: string,
        comics: ComicItem[]
    }
}

const ArchiveChapter = ({ chapter }: IArchiveChapterProps): JSX.Element => {
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
                key={chapter.name}
            >
                <div ref={nodeRef} className="archive-chapter-wrapper container-vertical">
                    <h2 className="chapter-name">{chapter.name}</h2>
                    <div className="archive-chapter container-horizontal">
                        {
                            chapter.comics.map((comic, i) => {
                                return (
                                    <ArchiveComicItem
                                        key={comic.slug + '_' + i}
                                        comic={comic}
                                        number={i}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default ArchiveChapter;
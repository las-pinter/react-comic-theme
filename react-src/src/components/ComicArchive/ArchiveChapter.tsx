import './index.css';

import { ForwardedRef, createRef, forwardRef, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { ArchiveComicItem, IComicItemNodeRef, TComicItem } from '../ComicItem/ComicItem';


export type TArchiveChapter = {
    name: string,
    comics: Array<TComicItem>,
    slug: string
}

interface IArchiveChapterComicItem extends IComicItemNodeRef {
    number: number
}

type TArchiveChapterComicItems = Array<IArchiveChapterComicItem>;

interface IArchiveChapterProps {
    chapter: TArchiveChapter
}

const ArchiveChapter = forwardRef(({ chapter }: IArchiveChapterProps, ref: ForwardedRef<any>): JSX.Element => {
    const [comicItems, setComicItems] = useState<TArchiveChapterComicItems>([]);

    useEffect(() => {
        setComicItems([]);
        chapter.comics.forEach((comicItem, index) => {
            let newComicItem = {
                ...comicItem,
                nodeRef: createRef(),
                number: index
            }
            setComicItems(prevArray => [...prevArray, newComicItem]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chapter])

    return (
        <div ref={ref} className="archive-chapter-wrapper container-vertical">
            <div className="chapter-name-wrapper">
                <h2 className="chapter-name">
                    {chapter.name}
                </h2>
                <div className="to-the-top-button" title="To the Top">
                    <ArrowUpwardIcon
                        fontSize="large"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    />
                </div>
            </div>
            <TransitionGroup className="archive-chapter container-horizontal">
                {
                    comicItems.map((comicItem) => {
                        const {
                            nodeRef: _nodeRef,
                            number: _number,
                            ...theComicItem
                        } = comicItem;

                        return (
                            <CSSTransition
                                classNames="fader"
                                nodeRef={comicItem.nodeRef}
                                mountOnEnter={true}
                                unmountOnExit={true}
                                appear={true}
                                timeout={10000}
                                addEndListener={(done: () => void) => {
                                    comicItem.nodeRef.current?.addEventListener("transitionend", done, false);
                                }}
                                key={"comic-item-" + comicItem.slug}
                            >
                                <ArchiveComicItem
                                    ref={comicItem.nodeRef}
                                    comic={theComicItem}
                                    number={comicItem.number + 1}
                                />
                            </CSSTransition>
                        );
                    })
                }
            </TransitionGroup>
        </div>
    );
});

export default ArchiveChapter;
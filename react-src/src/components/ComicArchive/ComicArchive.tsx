import './index.css';

import { useState, useEffect, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ArchiveChapter, { TArchiveChapter } from './ArchiveChapter';
import RestHandler from '../../rest/RestHandler';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

export interface IArchiveChapterNodeRef extends TArchiveChapter {
    nodeRef: React.MutableRefObject<any>
};

export type TComicArchive = Array<TArchiveChapter>
export type TComicArchiveNodeRef = Array<IArchiveChapterNodeRef>;

interface IComicArchiveProps extends IConsumerProps {
    comicSlug?: string
}

const ComicArchive = ({ context, comicSlug }: IComicArchiveProps): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [comicArchive, setComicArchive] = useState<TComicArchiveNodeRef>([]);

    useEffect(() => {
        setLoading(true);
        setComicArchive([]);
        context.addLoading();
        let url = '/wp-json/comics/v1/comicarchive/' + comicSlug;
        RestHandler.get(url).then((response) => {
            let responseData: TComicArchive = response.data;

            responseData.forEach((comicChapter) => {
                let newComicChapter: IArchiveChapterNodeRef = {
                    ...comicChapter,
                    nodeRef: createRef()
                }
                setComicArchive(prevArray => [...prevArray, newComicChapter]);
            });
        }).catch(() => {
        }).finally(() => {
            setLoading(false);
            context.removeLoading();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicSlug])

    if (comicArchive.length === 0 || loading) {
        return <></>;
    }

    return (
        <TransitionGroup className="comic-archive container-vertical">
            {
                comicArchive.map((chapter, i) => {
                    const {
                        nodeRef: _nodeRef,
                        ...theChapter
                    } = chapter;

                    return (
                        <CSSTransition
                            classNames="fader"
                            timeout={3000}
                            nodeRef={chapter.nodeRef}
                            appear={true}
                            addEndListener={(done: () => void) => {
                                chapter.nodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={"comic-chapter-" + chapter.slug}
                        >
                            <ArchiveChapter
                                ref={chapter.nodeRef}
                                chapter={theChapter}
                            />
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>
    );
};

export default WithConsumer(ComicArchive);
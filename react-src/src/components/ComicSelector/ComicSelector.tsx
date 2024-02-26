import './index.css';

import { createRef, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import RestHandler from '../../rest/RestHandler';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import ComicSelectorNavigator from './ComicSelectorNavigator';
import { TComic } from '../../context/Context';

interface TNodeRefComic extends TComic {
    nodeRef: React.MutableRefObject<any>
}

interface IComicSelectorProps extends IConsumerProps { }

const ComicSelector = ({ context }: IComicSelectorProps): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [selectorImages, setSelectorImages] = useState<Record<string, string> | null>(null);
    const [comics, setComics] = useState<Record<string, TNodeRefComic> | null>(null);

    useEffect(() => {
        setLoading(true);
        context.addLoading();
        let url = '/wp-json/settings/v1/selector_images';
        RestHandler.get(url).then((response) => {
            setSelectorImages(response.data);
        }).catch(() => {
        }).finally(() => {
            setLoading(false);
            context.removeLoading();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let newComics: Record<string, TNodeRefComic> = {};
        Object.keys(context.comics).forEach((key) => {
            let newComicItem: TNodeRefComic = {
                ...context.comics[key],
                nodeRef: createRef()
            };

            newComics[key] = newComicItem;
        });
        setComics(newComics);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.comics])

    if (!selectorImages || loading || !comics) {
        return <></>;
    }

    return (
        <TransitionGroup className="comic-selector container-horizontal">
            {
                Object.keys(comics).map((comicSlug, i) => {
                    let comic = comics[comicSlug];
                    return (
                        <CSSTransition
                            classNames="fader"
                            timeout={3000}
                            nodeRef={comic.nodeRef}
                            appear={true}
                            addEndListener={(done: () => void) => {
                                comic.nodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={comicSlug + '_' + i}
                        >
                            <div ref={comic.nodeRef} className={"comic-selector-comic container-vertical " + comicSlug}>
                                <div className="comic-name">{comic.name}</div>
                                <div className="comic-selector-image">
                                    <img src={selectorImages[comicSlug]} alt={comic.name} />
                                </div>
                                <div className="comic-selector-navigation container-horizontal">
                                    <ComicSelectorNavigator link={comic.firstPage} text={'First'} />
                                    <ComicSelectorNavigator link={'page/' + comic.archivePage} text={'Archive'} />
                                    <ComicSelectorNavigator link={comic.lastPage} text={'Last'} />
                                </div>
                            </div>
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>
    );
};

export default WithConsumer(ComicSelector);
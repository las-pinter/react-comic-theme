import './index.css';

import { createRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { CharacterComicItem, IComicItemNodeRef, TComicItem } from '../ComicItem/ComicItem';
import RestHandler from '../../rest/RestHandler';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

export type TCharacter = {
    name: string,
    thumbnailSquareSmall: string,
    thumbnailSquareMedium: string,
    thumbnailSquareLarge: string,
    thumbnailImageMedium: string,
    thumbnailImageLarge: string,
    description: string,
    order: number,
    group: string,
    image: string,
    slug: string
}

export interface ICharacterNodeRef extends TCharacter {
    nodeRef: React.MutableRefObject<any>
}

interface ITheCharacterProps extends IConsumerProps {
    character?: ICharacterNodeRef
}

export const TheCharacter = ({ context, character }: ITheCharacterProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    const [characterComicItems, setCharacterComicItems] = useState<Array<IComicItemNodeRef>>([]);

    const getCharacterComics = (slug: string) => {
        context.addLoading();
        setCharacterComicItems([]);
        let url = '/wp-json/comics/v1/character/' + slug + '/comics';
        return RestHandler.get(url).then((response) => {
            let responseData: Array<TComicItem> = response.data;

            responseData.forEach((comicItem) => {
                let newComicItem: IComicItemNodeRef = {
                    ...comicItem,
                    nodeRef: createRef(),
                }
                setCharacterComicItems(prevArray => [...prevArray, newComicItem]);
            });
        }).catch(() => {
        }).finally(() => {
            context.removeLoading();
        });
    }

    useEffect(() => {
        if (!character?.slug) {
            return;
        }

        getCharacterComics(character.slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!character) {
        return <></>;
    }

    return (
        <div className="the-character-wrapper container-vertical">
            <div className="the-character-item container-style">
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        classNames="fader"
                        nodeRef={nodeRef}
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                        timeout={10000}
                        addEndListener={(done: () => void) => {
                            nodeRef.current?.addEventListener("transitionend", done, false);
                        }}
                        key={character.name}
                    >
                        <div ref={nodeRef} className="the-character-content-wrapper container-vertical">
                            <h1>
                                <Link to={'/character/' + character.slug}>{character.name}</Link>
                            </h1>
                            <div className="container-horizontal">
                                <div className="the-character-image">
                                    {
                                        character.image ?
                                            <img
                                                src={character.image}
                                                alt={character.name}
                                            /> :
                                            <div className="gray-placeholder"></div>
                                    }
                                </div>
                                <div className="the-character-description">
                                    {character.description}
                                </div>
                            </div>
                            <div className="the-character-comic-list container-vertical">
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDownwardIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography>Comic Pages</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TransitionGroup className="the-character-comic-list-wrapper container-horizontal">
                                            {
                                                characterComicItems.map((comicItem) => {
                                                    const {
                                                        nodeRef: _nodeRef,
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
                                                            <CharacterComicItem ref={comicItem.nodeRef} comic={theComicItem} />
                                                        </CSSTransition>
                                                    )
                                                })
                                            }
                                        </TransitionGroup>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}

export default WithConsumer(TheCharacter);
import './index.css';

import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { CharacterComicItem } from '../ComicItem';

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

interface ITheCharacterProps {
    character: TCharacter
}

export const TheCharacter = ({ character }: ITheCharacterProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    const [characterComics, setCharacterComics] = useState([]);

    const getCharacterComics = (slug: string) => {
        let url = '/wp-json/comics/v1/character/' + slug + '/comics';
        return Axios.get(url).then((response) => {
            setCharacterComics(response.data);
        }).catch(() => {
        });
    }

    useEffect(() => {
        if (!character.slug) {
            return;
        }

        getCharacterComics(character.slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="the-character-wrapper container-vertical">
            <div className="the-character-item">
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        classNames="fader"
                        timeout={3000}
                        nodeRef={nodeRef}
                        appear={true}
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
                                <h2>Comic Pages</h2>
                                <div className="the-character-comic-list-wrapper container-horizontal">
                                    {
                                        characterComics.map((comic, i) => {
                                            return <CharacterComicItem key={i} comic={comic} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}

export default TheCharacter;
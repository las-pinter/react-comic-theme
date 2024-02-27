import './index.css';

import { createRef, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import RestHandler from '../../rest/RestHandler';

import CharacterItem from "../CharacterItem/CharacterItem";
import { TCharacter } from '../TheCharacter/TheCharacter';
import { IComicPost } from "./TheComic";
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

interface ICharacterNoderef extends TCharacter {
    nodeRef: React.MutableRefObject<any>
}

interface ICharactersProps extends IConsumerProps {
    comicPost?: IComicPost
}

const Characters = ({ context, comicPost }: ICharactersProps) => {
    const [characters, setCharacters] = useState<Array<ICharacterNoderef>>([]);

    useEffect(() => {
        if (!comicPost) {
            return;
        }

        context.addLoading();

        let characterList = comicPost._embedded['wp:term'][2];

        let promises: Promise<TCharacter>[] = [];
        characterList.forEach(character => {
            let url = '/wp-json/comics/v1/character/' + character.slug;

            promises.push(
                RestHandler.get(url).then((response) => {
                    return response.data;
                }).catch(() => {
                    return null;
                })
            );
        });

        Promise.all(promises).then((values: Array<TCharacter>) => {
            let newCharacters: Array<ICharacterNoderef> = [];
            values.forEach((value) => {
                let newCharacter: ICharacterNoderef = {
                    ...value,
                    nodeRef: createRef()
                }
                newCharacters.push(newCharacter);
            })
            setCharacters(newCharacters);
        }).finally(() => {
            context.removeLoading();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicPost])

    return (
        <TransitionGroup className="comic-character-list container-horizontal container-style">
            {
                characters.map((character, i) => {
                    return (
                        <CSSTransition
                            classNames="fader"
                            timeout={3000}
                            nodeRef={character.nodeRef}
                            appear={true}
                            addEndListener={(done: () => void) => {
                                character.nodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={"comic-character-" + character.slug}
                        >
                            <CharacterItem ref={character.nodeRef} character={character} thumbnailSize='small' />
                        </CSSTransition>
                    );
                })
            }
        </TransitionGroup>
    );
};

export default WithConsumer(Characters);
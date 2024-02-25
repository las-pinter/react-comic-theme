import './index.css';

import { useEffect, useState } from "react";

import RestHandler from '../../rest/RestHandler';

import CharacterItem from "../CharacterItem/CharacterItem";
import { TCharacter } from '../TheCharacter/TheCharacter';
import { IComicPost } from "./TheComic";
import { Link } from 'react-router-dom';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

interface ICharactersProps extends IConsumerProps {
    comicPost?: IComicPost
}

const Characters = ({ context, comicPost }: ICharactersProps) => {
    const [characters, setCharacters] = useState<Array<TCharacter>>([]);

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
            setCharacters(values);
        }).finally(() => {
            context.removeLoading();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicPost])

    return (
        <div className="comic-character-list container-horizontal container-style">
            {
                characters.map((character, i) => {
                    return (
                        <Link key={"comic-character-" + i} to={'../character/' + character.slug}>
                            <CharacterItem character={character} thumbnailSize='small' />
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default WithConsumer(Characters);
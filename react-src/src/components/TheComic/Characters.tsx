import './index.css';

import { useEffect, useState } from "react";
import Axios from 'axios';

import CharacterItem from "../CastPage/CharacterItem";
import { TCharacter } from '../TheCharacter';
import { IComicPost } from ".";
import { Link } from 'react-router-dom';

interface ICharactersProps {
    comicPost: IComicPost
}

const Characters = ({ comicPost }: ICharactersProps) => {
    const [characters, setCharacters] = useState<Array<TCharacter>>([]);

    useEffect(() => {
        if (!comicPost) {
            return;
        }

        let characterList = comicPost._embedded['wp:term'][2];

        let promises: Promise<TCharacter>[] = [];
        characterList.forEach(character => {
            let url = '/wp-json/comics/v1/character/' + character.slug;

            promises.push(
                Axios.get(url).then((response) => {
                    return response.data;
                }).catch(() => {
                    return null;
                })
            );
        });

        Promise.all(promises).then((values: Array<TCharacter>) => {
            setCharacters(values);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicPost])

    return (
        <div className="comic-character-list container-horizontal">
            {
                characters.map((character, i) => {
                    return (
                        <Link key={"comic-character-" + i} to={'../character/' + character.slug}>
                            <CharacterItem character={character} />
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default Characters;
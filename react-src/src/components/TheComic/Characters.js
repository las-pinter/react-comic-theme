import React,
{
    useEffect,
    useState
} from "react";
import Axios from 'axios';

import CharacterItem from "./CharacterItem";

import './index.css';

const Characters = ({ comicPost }) => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        if (!comicPost) {
            return;
        }

        if (!comicPost._embedded['wp:term']) {
            return;
        }

        let characterList = comicPost._embedded['wp:term'][2];

        let promises = [];
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

        Promise.all(promises).then((values) => {
            setCharacters(values);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicPost])

    return (
        <div className="comic-character-list container-horizontal">
            {
                characters.map((character, i) => {
                    return (
                        <CharacterItem key={"comic-character-" + i} character={character} />
                    );
                })
            }
        </div>
    );
};

export default Characters;
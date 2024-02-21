import './index.css';

import { useEffect, useState } from 'react';
import Axios from 'axios';

import TheCharacter, { TCharacter } from "../components/TheCharacter";

interface ICharacterProps {
    slug: string
}

const Character = ({ slug }: ICharacterProps): JSX.Element => {
    const [character, setCharacter] = useState<TCharacter | null>(null);

    const getCharacter = (slug: string) => {
        let url = '/wp-json/comics/v1/character/' + slug;
        return Axios.get(url).then((response) => {
            setCharacter(response.data);
        }).catch(() => {
        });
    }

    useEffect(() => {
        if (!slug) {
            return;
        }

        getCharacter(slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (!character) {
        return <></>;
    }

    return (
        <div className="character-single container-vertical">
            <TheCharacter character={character} />
        </div>
    )

}
export default Character;
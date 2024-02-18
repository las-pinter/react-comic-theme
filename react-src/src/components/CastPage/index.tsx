import './index.css';

import { useState, useEffect } from 'react';
import Axios from 'axios';

import CharacterGroup from './CharacterGroup';
import { TCharacter } from './CharacterItem';

const CastPage = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [characterGroups, setCharacterGroups] = useState<Record<string, TCharacter[]>>({});
    const [characterGroupOrder, setCharacterGroupOrder] = useState<Array<string>>([]);

    useEffect(() => {
        setLoading(true);
        let url = '/wp-json/comics/v1/characters/';
        Axios.get(url).then((response) => {
            let characters: Array<TCharacter> = response.data;
            let characterGroups: Record<string, TCharacter[]> = {};

            characters.forEach(character => {
                let characterGroup = character.group ? character.group : 'Unknown';
                if (!(characterGroup in characterGroups)) {
                    characterGroups[characterGroup] = [];
                }
                characterGroups[characterGroup].push(character);
            });

            setCharacterGroups(characterGroups);
            setLoading(false);
        }).catch(() => {
        }).then(() => {
            let url = '/wp-json/settings/v1/char_group_order/';
            Axios.get(url).then((response) => {
                setCharacterGroupOrder(response.data);
            });
        }).catch(() => {
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (Object.keys(characterGroups).length === 0 ||
        Object.keys(characterGroupOrder).length === 0 ||
        loading) {
        return <></>;
    }

    return (
        <div className="cast-page container-vertical">
            {
                characterGroupOrder.map((key, i) => {
                    return <CharacterGroup key={i} characterGroupName={key} characterGroup={characterGroups[key]} level={i} />;
                })
            }
        </div>
    );
};

export default CastPage;
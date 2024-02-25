import './index.css';

import { useState, useEffect } from 'react';

import CharacterGroup from './CharacterGroup';
import { TCharacter } from '../TheCharacter/TheCharacter';
import RestHandler from '../../rest/RestHandler';

const CastPage = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [characterGroups, setCharacterGroups] = useState<Record<string, TCharacter[]>>({});
    const [characterGroupOrder, setCharacterGroupOrder] = useState<Array<string>>([]);

    useEffect(() => {
        setLoading(true);
        let url = '/wp-json/comics/v1/characters/';
        RestHandler.get(url).then((response) => {
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

        }).catch(() => {
        }).then(() => {
            let url = '/wp-json/settings/v1/char_group_order/';
            RestHandler.get(url).then((response) => {
                setCharacterGroupOrder(Object.values(response.data));
                setLoading(false);
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

    let charGroupKeys = Object.keys(characterGroups);

    charGroupKeys.sort((a, b) => {
        return characterGroupOrder.indexOf(a) - characterGroupOrder.indexOf(b);
    })

    let sortedCharacterGroups: Record<string, TCharacter[]> = {};

    charGroupKeys.forEach((key) => {
        sortedCharacterGroups[key] = characterGroups[key];
    })

    return (
        <div className="cast-page container-vertical">
            {
                Object.keys(sortedCharacterGroups).map((key, i) => {
                    return <CharacterGroup key={i} characterGroupName={key} characterGroup={sortedCharacterGroups[key]} level={i} />;
                })
            }
        </div>
    );
};

export default CastPage;
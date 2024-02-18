import './index.css';

import CharacterItem, { TCharacter } from './CharacterItem';

export type TCharacterGroup = Array<TCharacter>

interface ICharacterGroupProps {
    characterGroupName: string,
    characterGroup: TCharacterGroup,
    level: number
}

const CharacterGroup = ({ characterGroupName, characterGroup, level }: ICharacterGroupProps): JSX.Element => {
    return (
        <div className={"character-group-wrapper character-group-level-" + level}>
            <h2>{ characterGroupName }</h2>
            <div className="character-group container-horizontal">
                {
                    characterGroup.map((character, i) => {
                        return <CharacterItem key={character.name + i} character={character} />
                    })
                }
            </div>
        </div>
    );
};

export default CharacterGroup;
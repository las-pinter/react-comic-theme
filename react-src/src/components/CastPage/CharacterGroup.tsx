import './index.css';

import CharacterItem from '../CharacterItem';
import { TCharacter } from '../TheCharacter';

export type TCharacterGroup = Array<TCharacter>

interface ICharacterGroupProps {
    characterGroupName: string,
    characterGroup: TCharacterGroup,
    level: number
}

const CharacterGroup = ({ characterGroupName, characterGroup, level }: ICharacterGroupProps): JSX.Element => {
    return (
        <div className="cast-page-character-group-wrapper">
            <h2>{characterGroupName}</h2>
            <div className="cast-page-character-group container-horizontal">
                {
                    characterGroup.map((character, i) => {
                        let thumbSize = 'small';
                        switch (level) {
                            case 0:
                                thumbSize = 'large';
                                break;
                            case 1:
                                thumbSize = 'medium';
                                break;
                            default:
                                break;
                        }
                        return <CharacterItem key={character.name + i} character={character} thumbnailSize={thumbSize} />
                    })
                }
            </div>
        </div>
    );
};

export default CharacterGroup;
import './index.css';

import { TCharacter } from '../TheCharacter';

interface ICharacterItemProps {
    character: TCharacter
}

const CharacterItem = ({ character }: ICharacterItemProps): JSX.Element => {
    return (
        <div className="cast-page-character-item fadeIn">
            <div className="cast-page-character-name">{character.name}</div>
            <div className="cast-page-character-thumbnail">
                {
                    character.image ?
                        <img
                            src={character.thumbnail}
                            alt={character.name}
                        /> :
                        <div className="gray-placeholder"></div>
                }
            </div>
        </div>
    );
};

export default CharacterItem;
import './index.css';

import { Link } from 'react-router-dom';
import { ForwardedRef, forwardRef } from 'react';

import { TCharacter } from '../TheCharacter/TheCharacter';

interface ICharacterItemProps {
    character: TCharacter,
    thumbnailSize: string
}

const CharacterItem = forwardRef(({ character, thumbnailSize }: ICharacterItemProps, ref: ForwardedRef<any>): JSX.Element => {
    let displayImage = character.thumbnailSquareSmall;
    switch (thumbnailSize) {
        case 'small':
            displayImage = character.thumbnailSquareSmall;
            break;
        case 'medium':
            displayImage = character.thumbnailSquareMedium;
            break;
        case 'large':
            displayImage = character.thumbnailSquareLarge;
            break;
        default:
            break;
    }
    return (
        <div ref={ref} className="character-item">
            <Link to={"/character/" + character.slug}>
                <div className={"character-thumbnail character-thumbnail-" + thumbnailSize}>
                    {
                        displayImage ?
                            <img
                                src={displayImage}
                                alt={character.name}
                                title={character.name}
                            /> :
                            <div className="gray-placeholder"></div>
                    }
                </div>
                <div className="character-name">{character.name}</div>
            </Link>
        </div>
    );
});

export default CharacterItem;
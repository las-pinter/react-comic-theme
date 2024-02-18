import './index.css';

export type TCharacter = {
    name: string,
    thumbnail: string,
    order: number,
    group: string,
    image: string
}

interface ICharacterItemProps {
    character: TCharacter
}

const CharacterItem = ({ character }: ICharacterItemProps): JSX.Element => {
    return (
        <div className="comic-character-item fadeIn">
            <div className="comic-character-name">{character.name}</div>
            <div className="comic-character-thumbnail">
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
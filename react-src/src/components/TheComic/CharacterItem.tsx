import './index.css';

export type TCharacter = {
    name: string,
    thumbnail: string,
    image: string
}

interface ICharacterItemProps {
    character: TCharacter
}

const CharacterItem = ({ character }: ICharacterItemProps) => {
    return (
        <div className="comic-character-item">
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
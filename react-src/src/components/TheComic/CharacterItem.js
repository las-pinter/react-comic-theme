import React from "react";

import './index.css';

const CharacterItem = ({ character }) => {
    return (
        <div className="comic-character-item">
            <div className="comic-character-name">{character.name}</div>
            <div className="comic-character-thumbnail">
                {
                    character.image ?
                        <img
                            src={character.image}
                            alt={character.name}
                        /> :
                        <div className="gray-placeholder"></div>
                }
            </div>
        </div>
    );
};

export default CharacterItem;
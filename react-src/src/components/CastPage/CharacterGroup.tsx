import './index.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ForwardedRef, forwardRef } from 'react';

import CharacterItem from '../CharacterItem/CharacterItem';
import { ICharacterNodeRef } from '../TheCharacter/TheCharacter';

export type TCharacterGroup = {
    characters: Array<ICharacterNodeRef>;
}
export interface ICharacterGroupNodeRef extends TCharacterGroup {
    characters: Array<ICharacterNodeRef>,
    nodeRef: React.MutableRefObject<any>
};

interface ICharacterGroupProps {
    characterGroupName: string,
    characterGroup: TCharacterGroup,
    level: number
}

const CharacterGroup =  forwardRef(({ characterGroupName, characterGroup, level }: ICharacterGroupProps, ref: ForwardedRef<any>): JSX.Element => {
    return (
        <div ref={ref} className="cast-page-character-group-wrapper">
            <h2>{characterGroupName}</h2>
            <TransitionGroup className="cast-page-character-group container-horizontal">
                {
                    characterGroup.characters.map((character, i) => {
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
                        const {
                            nodeRef: _nodeRef,
                            ...theCharacter
                        } = character;
                        return (
                            <CSSTransition
                                classNames="fader"
                                nodeRef={character.nodeRef}
                                mountOnEnter={true}
                                unmountOnExit={true}
                                appear={true}
                                timeout={10000}
                                addEndListener={(done: () => void) => {
                                    character.nodeRef.current?.addEventListener("transitionend", done, false);
                                }}
                                key={"character-item-" + character.slug}
                            >
                                <CharacterItem ref={character.nodeRef} key={character.name + i} character={theCharacter} thumbnailSize={thumbSize} />
                            </CSSTransition>
                        );
                    })
                }
            </TransitionGroup>
        </div>
    );
});

export default CharacterGroup;
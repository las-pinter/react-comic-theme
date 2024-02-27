import './index.css';

import { useState, useEffect, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import CharacterGroup, { ICharacterGroupNodeRef } from './CharacterGroup';
import { TCharacter } from '../TheCharacter/TheCharacter';
import RestHandler from '../../rest/RestHandler';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

type TCharacterGroupsNodeRef = Record<string, ICharacterGroupNodeRef>;

interface ICastPageProps extends IConsumerProps { }

const CastPage = ({ context }: ICastPageProps): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [characterGroups, setCharacterGroups] = useState<TCharacterGroupsNodeRef>({});
    const [characterGroupOrder, setCharacterGroupOrder] = useState<Array<string>>([]);

    useEffect(() => {
        setLoading(true);
        context.addLoading();
        let url = '/wp-json/comics/v1/characters/';
        RestHandler.get(url).then((response) => {
            let characters: Array<TCharacter> = response.data;
            let characterGroups: TCharacterGroupsNodeRef = {};

            characters.forEach(character => {
                let characterGroup = character.group ? character.group : 'Unknown';
                if (!(characterGroup in characterGroups)) {
                    characterGroups[characterGroup] = {
                        characters: [],
                        nodeRef: createRef()
                    }
                }
                characterGroups[characterGroup].characters.push({
                    ...character,
                    nodeRef: createRef()
                });
            });

            setCharacterGroups(characterGroups);
        }).catch(() => {
        }).then(() => {
            let url = '/wp-json/settings/v1/char_group_order/';
            RestHandler.get(url).then((response) => {
                setCharacterGroupOrder(Object.values(response.data));
            });
        }).catch(() => {
        }).finally(() => {
            setLoading(false);
            context.removeLoading();
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

    let sortedCharacterGroups: TCharacterGroupsNodeRef = {};

    charGroupKeys.forEach((key) => {
        sortedCharacterGroups[key] = {
            ...characterGroups[key],
            nodeRef: createRef()
        }
    })

    return (
        <TransitionGroup className="cast-page container-vertical">
            {
                Object.keys(sortedCharacterGroups).map((key, i) => {
                    const sortedCharacterGroup: ICharacterGroupNodeRef = sortedCharacterGroups[key];
                    const {
                        nodeRef: _nodeRef,
                        ...theSortedCharacterGroup
                    } = sortedCharacterGroup;
                    return (
                        <CSSTransition
                            classNames="fader"
                            timeout={3000}
                            nodeRef={sortedCharacterGroup.nodeRef}
                            appear={true}
                            addEndListener={(done: () => void) => {
                                sortedCharacterGroup.nodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={"character-group-" + key}
                        >
                            <CharacterGroup ref={sortedCharacterGroup.nodeRef} characterGroupName={key} characterGroup={theSortedCharacterGroup} level={i} />
                        </CSSTransition>
                    );
                })
            }
        </TransitionGroup>
    );
};

export default WithConsumer(CastPage);
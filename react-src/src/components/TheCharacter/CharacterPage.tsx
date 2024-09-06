import './index.css';

import { useEffect, useRef, useState } from 'react';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

import RestHandler from '../../rest/RestHandler';

import { IPage } from '../ThePage/ThePage';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

interface ICharacterPageProps extends IConsumerProps {
    characterPageSlug?: string
}

const CharacterPage = ({ characterPageSlug, context }: ICharacterPageProps): JSX.Element => {
    const nodeRef = useRef<any>(null);
    const [characterPage, setCharacterPage] = useState<IPage | null>(null);

    const getCharacterPage = (slug: string) => {
        context.addLoading();
        let url = '/wp-json/wp/v2/pages/?slug=' + slug + '&_embed';
        return RestHandler.get(url).then((response) => {
            let characterPage = response.data[0];
            setCharacterPage(characterPage);
        }).catch(() => {
        }).finally(() => {
            context.removeLoading();
        });
    }

    useEffect(() => {
        if (!characterPageSlug) {
            return;
        }

        getCharacterPage(characterPageSlug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!characterPage) {
        return <></>;
    }

    let theContent = <div className="character-page-content" dangerouslySetInnerHTML={{ __html: characterPage.content.rendered }}></div>;

    return (
            <div id={'character-page-id-' + characterPage.id}>
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        classNames="fader"
                        nodeRef={nodeRef}
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                        timeout={10000}
                        addEndListener={(done: () => void) => {
                            nodeRef.current?.addEventListener("transitionend", done, false);
                        }}
                        key={characterPage.slug}
                    >
                        <div ref={nodeRef} className="character-page-content-wrapper">
                            {theContent}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
    );
};

export default WithConsumer(CharacterPage);
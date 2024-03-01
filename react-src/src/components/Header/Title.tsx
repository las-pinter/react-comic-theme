import './index.css'

import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

const Title = ({ context }: IConsumerProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    if (Object.keys(context.logoImages).length === 0) {
        return <></>;
    }

    let currentLogoImage = context.currentComic.comicSlug ? context.logoImages[context.currentComic.comicSlug] : context.logoImages.main;
    let imageTitle = context.currentComic.comicSlug ? context.comics[context.currentComic.comicSlug]?.name : "Tales From Somewhere";

    return (
        <div className="comic-logo">
            <Link to="/">
                <div className="comic-logo-image">
                    <SwitchTransition mode={"out-in"}>
                        <CSSTransition
                            classNames="fader"
                            nodeRef={nodeRef}
                            appear={true}
                            mountOnEnter={true}
                            unmountOnExit={true}
                            timeout={10000}
                            addEndListener={(done: () => void) => {
                                nodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={imageTitle}
                        >
                            <img ref={nodeRef} src={currentLogoImage} alt={imageTitle} title={imageTitle} />
                        </CSSTransition>
                    </SwitchTransition>
                </div>

            </Link>
        </div>
    );
}

export default WithConsumer(Title);
import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import WithHeadFoot from '../wrappers/WithHeadFoot';
import WithProvider from '../wrappers/WithProvider';
import WithBackground from '../wrappers/WithBackground';
import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

import MainPage from './MainPage';
import Page from './Page';
import Comic from './Comic';
import Post from './Post';
import Character from './Character';

import UsePageTracking from '../hooks/PageTracking';
import ResetComicAdVars from '../hooks/ComicAdReseter';

interface IPageRouterProps extends IConsumerProps {
    contextType?: string
}

const PageRouter = ({ context, contextType }: IPageRouterProps): JSX.Element => {
    UsePageTracking();
    ResetComicAdVars();
    
    const nodeRef = useRef<any>(null);

    return (
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
                key={contextType}
            >
                <div ref={nodeRef} className="content-wrapper container-vertical">
                    {
                        (() => {
                            switch (contextType) {
                                case 'mainPage':
                                    return (<MainPage />);
                                case 'page':
                                    return (<Page slug={context.slug} />);
                                case 'comic':
                                    return (<Comic
                                        comicPageSlug={context.currentComic.comicPageSlug}
                                        comicPageFullSlug={context.currentComic.comicPageFullSlug}
                                    />);
                                case 'post':
                                    return (<Post slug={context.slug} />);
                                case 'character':
                                    return (<Character slug={context.slug} />);
                                default:
                                    return (<></>);
                            }
                        })()
                    }
                </div>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default WithProvider(WithBackground(WithHeadFoot(WithConsumer(PageRouter))));

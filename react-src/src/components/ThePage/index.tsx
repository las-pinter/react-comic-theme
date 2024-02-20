import './index.css';

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

import ComicArchive from '../ComicArchive';
import CastPage from '../CastPage';
import DisqusComments from '../DisqusComments';
import { IPost } from '../ThePost';

export interface IPage extends IPost { }

interface IThePageProps extends IConsumerProps {
    page?: IPage
}

const ThePage = ({ page, context }: IThePageProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    if (!page) {
        return <></>;
    }

    let theContent = <></>;
    const comicArchive = Object.values(context.comics).find(comic => comic.archivePage === page.slug);
    const castPage = context.castPageSlug === page.slug;

    if (comicArchive) {
        theContent = <ComicArchive comicSlug={comicArchive.comicSlug} />;
    } else if (castPage) {
        theContent = <CastPage />;
    } else {
        theContent = <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>;
    }

    return (
        <div className="page-wrapper container-vertical">
            <div id={'page-id-' + page.id} className="page-item">
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        classNames="fader"
                        timeout={3000}
                        nodeRef={nodeRef}
                        appear={true}
                        addEndListener={(done: () => void) => {
                            nodeRef.current?.addEventListener("transitionend", done, false);
                        }}
                        key={page.slug}
                    >
                        <div ref={nodeRef} className="page-content-wrapper">
                            <h1><Link to={'/page/' + page.slug}>{page.title.rendered}</Link></h1>
                            {theContent}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
            <DisqusComments post={page} display={true} />
        </div>
    );
};

export default WithConsumer(ThePage);
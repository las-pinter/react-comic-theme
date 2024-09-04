import './index.css';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import ComicNavigator from './ComicNavigator';
import Characters from './Characters';
import ComicTitle from './ComicTitle';

import { IPost } from '../ThePost/ThePost';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import ContentWarningOverlay from './ContentWarningOverlay';
import ComicLoadingOverlay from './ComicLoadingOverlay';

export interface IComicPost extends IPost {
    type: 'comic',
    page_number: number,
    chapter_number: number,
    first_page: string,
    previous_page: string,
    next_page: string,
    last_page: string,
    content_warning: string,
}

interface ITheComicProps extends IConsumerProps {
    comicPost?: IComicPost
}

const TheComic = ({ context, comicPost }: ITheComicProps): JSX.Element => {
    const nodeRef = useRef<any>(null);
    const [comicImageUrl, setComicImageUrl] = useState('');
    const [contentWarning, setContentWarning] = useState('0');

    useEffect(() => {
        context.addLoading();

        let comicImageUrl = '';
        if (comicPost?._embedded?.['wp:featuredmedia']) {
            comicImageUrl = comicPost._embedded['wp:featuredmedia'][0].source_url;
        }

        const img = new Image();
        img.onload = () => {
            setComicImageUrl(comicImageUrl);
            setContentWarning(comicPost?.content_warning ? comicPost.content_warning : '0')
            context.removeLoading();
        }
        img.src = comicImageUrl;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicPost])

    if (!comicPost) {
        return <></>;
    }

    let comicNavLinks = {
        firstPage: comicPost.first_page,
        previousPage: comicPost.previous_page,
        nextPage: comicPost.next_page,
        lastPage: comicPost.last_page
    }

    return (
        <div className="the-comic-container">
            <ComicTitle chapterNumber={comicPost.chapter_number} pageNumber={comicPost.page_number} title={comicPost.title.rendered} />
            <div className="navigator-top">
                <ComicNavigator comicNavLinks={comicNavLinks} />
            </div>
            <div id="the-comic">
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
                        key={comicImageUrl}
                    >
                        <>
                            <Link
                                ref={nodeRef}
                                className="the-comic-link"
                                to={comicNavLinks.nextPage}
                            >
                                {
                                    comicImageUrl
                                        ?
                                        <img
                                            src={comicImageUrl}
                                            alt={"Chapter " + comicPost.chapter_number + " - Page " + comicPost.page_number + " - " + comicPost.title.rendered}
                                            title={"Chapter " + comicPost.chapter_number + " - Page " + comicPost.page_number + " - " + comicPost.title.rendered}
                                        />
                                        :
                                        <></>
                                }
                            </Link>
                            {
                                contentWarning === '1'
                                    ?
                                    <ContentWarningOverlay />
                                    :
                                    <></>
                            }
                            {
                                context.loading && comicImageUrl !== ""
                                    ?
                                    <ComicLoadingOverlay />
                                    :
                                    <></>
                            }
                        </>
                    </CSSTransition>
                </SwitchTransition>
            </div>
            <div className="navigator-bottom">
                <ComicNavigator comicNavLinks={comicNavLinks} />
            </div>
            <Characters comicPost={comicPost} />
        </div>
    );
};

export default WithConsumer(TheComic);
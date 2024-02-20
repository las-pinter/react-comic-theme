import './index.css';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import DisqusComments from '../DisqusComments';
import PostMeta from './PostMeta';


export interface IPost {
    type: string,
    _embedded: {
        author: Array<{
            name: string
        }>,
        'wp:featuredmedia': Array<{
            source_url: string
        }>,
        'wp:term': Array<
            Array<{
                slug: string
            }>
        >
    },
    date: string,
    slug: string,
    content: {
        rendered: string
    },
    title: {
        rendered: string
    },
    id: string
};

interface IThePostProps {
    post: IPost,
    displayComments: boolean
}

export const ThePost = ({ post, displayComments }: IThePostProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    if (!post) {
        return <></>;
    }

    return (
        <div className="post-wrapper container-vertical">
            <div id={'post-id-' + post.id} className={'post-item'}>
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        classNames="fader"
                        timeout={3000}
                        nodeRef={nodeRef}
                        appear={true}
                        addEndListener={(done: () => void) => {
                            nodeRef.current?.addEventListener("transitionend", done, false);
                        }}
                        key={post.slug}
                    >
                        <div ref={nodeRef} className="post-content-wrapper">
                            <h1>
                                <Link to={'/' + post.slug}>
                                    {post.title.rendered}
                                </Link>
                            </h1>
                            <PostMeta post={post} />
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
            {
                displayComments
                    ?
                    <DisqusComments post={post} display={true} />
                    :
                    <></>
            }
        </div>
    );
};

interface ITheComicPostProps {
    post: IPost,
    comicPageFullSlug: string
}

export const TheComicPost = ({ post, comicPageFullSlug }: ITheComicPostProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    if (!post) {
        return <></>;
    }

    return (
        <div className="post-wrapper container-vertical">
            <div id={'post-id-' + post.id} className={'post-item'}>
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        classNames="fader"
                        timeout={3000}
                        nodeRef={nodeRef}
                        appear={true}
                        addEndListener={(done: () => void) => {
                            nodeRef.current?.addEventListener("transitionend", done, false);
                        }}
                        key={comicPageFullSlug}
                    >
                        <div ref={nodeRef} className="post-content-wrapper">
                            <h1>
                                <Link to={'/comic/' + comicPageFullSlug}>
                                    {post.title.rendered}
                                </Link>
                            </h1>
                            <PostMeta index={post} />
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
            <DisqusComments post={post} display={true} />
        </div>
    );
};

export default ThePost;
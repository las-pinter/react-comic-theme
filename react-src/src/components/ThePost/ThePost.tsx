import './index.css';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import DisqusComments from '../DisqusComments/DisqusComments';
import PostMeta from './PostMeta';


export type TTerm = {
    id: number,
    link: string,
    name: string,
    slug: string,
    taxonomy: string
}

export interface IPost {
    type: string,
    _embedded: {
        author: Array<{
            name: string
        }>,
        'wp:featuredmedia': Array<{
            source_url: string
        }>,
        'wp:term': Array<Array<TTerm>>
    },
    date: string,
    slug: string,
    content: {
        rendered: string
    },
    title: {
        rendered: string
    },
    id: string,
    guid: {
        rendered: string
    }
};

interface IThePostProps {
    post: IPost,
    displayComments: boolean,
    comicPageFullSlug?: string,
}

export const ThePost = ({ post, displayComments, comicPageFullSlug }: IThePostProps): JSX.Element => {
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
                        nodeRef={nodeRef}
                        mountOnEnter={true}
                        unmountOnExit={true}
                        appear={true}
                        timeout={10000}
                        addEndListener={(done: () => void) => {
                            nodeRef.current?.addEventListener("transitionend", done, false);
                        }}
                        key={comicPageFullSlug ? comicPageFullSlug : post.slug}
                    >
                        <div ref={nodeRef} className="post-content-wrapper">
                            <h1>
                                <Link to={comicPageFullSlug ? '/comic/' + comicPageFullSlug : '/' + post.slug}>
                                    {post.title.rendered}
                                </Link>
                            </h1>
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                            <PostMeta post={post} />
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

export default ThePost;
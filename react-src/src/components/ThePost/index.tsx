import { Link } from 'react-router-dom';

import DisqusComments from '../DisqusComments';
import PostMeta from './PostMeta';
import Fader from '../../effects/Fader';

import './index.css';

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
    if (!post) {
        return <></>;
    }

    return (
        <div className="post-wrapper container-vertical">
            <div id={'post-id-' + post.id} className={'post-item'}>
                <Fader depend={post}>
                    <h1>
                        <Link to={'/' + post.slug}>
                            {post.title.rendered}
                        </Link>
                    </h1>
                    <PostMeta post={post} />
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </Fader>
            </div>
            {
                displayComments
                    ?
                    <Fader depend={post}>
                        <DisqusComments post={post} display={true} />
                    </Fader>
                    :
                    <></>
            }
        </div>
    );
};

interface ITheComicPostProps {
    post: IPost,
    comicFullSlug: string
}

export const TheComicPost = ({ post, comicFullSlug }: ITheComicPostProps): JSX.Element => {
    if (!post) {
        return <></>;
    }
    
    return (
        <div className="post-wrapper container-vertical">
            <div id={'post-id-' + post.id} className={'post-item'}>
                <Fader depend={post}>
                    <h1>
                        <Link to={'/comic/' + comicFullSlug}>
                            {post.title.rendered}
                        </Link>
                    </h1>
                    <PostMeta index={post} />
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </Fader>
            </div>
            <Fader depend={post}>
                <DisqusComments post={post} display={true} />
            </Fader>
        </div>
    );
};

export default ThePost;
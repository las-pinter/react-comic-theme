import { Link } from 'react-router-dom';

import DisqusComments from '../DisqusComments';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import PostMeta from '.';

import './index.css';
import Fader from '../../effects/Fader';

const ThePost = ({ index, ctxState }: IConsumerProps): JSX.Element => {
    if (ctxState.posts.length === 0 || index === undefined) {
        return <></>;
    }

    const post = ctxState.posts[index];

    let linkPrefix = '';
    switch (post.type) {
        case 'comic':
            linkPrefix = '/comic/';
            break;
        case 'post':
        default:
            linkPrefix = '/';
            break;
    }

    let linkSlug = post.slug;
    let theContent = '';

    switch (ctxState.contextType) {
        case 'comic':
            theContent = post.content.rendered;
            linkPrefix = '/comic/';
            linkSlug = ctxState.currentComic.comicFullSlug ? ctxState.currentComic.comicFullSlug : post.slug;
            break;
        case 'mainPage':
        case 'post':
            theContent = post.content.rendered;
            break;
        default:
            theContent = '';
            break;
    }

    return (
        <div className="post-wrapper container-vertical">

            <div id={'post-id-' + post.id} className={'post-item'}>
                <Fader depend={ctxState.posts}>
                    <h1>
                        <Link to={linkPrefix + linkSlug}>
                            {post.title.rendered}
                        </Link>
                    </h1>
                    <PostMeta index={index} />
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: theContent }} />
                </Fader>
            </div>
            {
                (() => {
                    if (ctxState.contextType !== 'mainPage') {
                        return (
                            <Fader depend={ctxState.posts}>
                                <DisqusComments post={post} display={true} />
                            </Fader>
                        );
                    }
                })()
            }

        </div>
    );
};

export default WithConsumer(ThePost);
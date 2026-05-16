import './index.css';

import { ForwardedRef, forwardRef } from 'react';
import { DiscussionEmbed } from 'disqus-react';

import { IPost } from '../ThePost/ThePost';
import { IComicPost } from '../TheComic/TheComic';
import { IPage } from '../ThePage/ThePage';

interface IDisqusCommentsProps {
    post: IPost | IComicPost | IPage,
    display: boolean
}

const DisqusComments = forwardRef((props: IDisqusCommentsProps, ref: ForwardedRef<any>): JSX.Element => {
    return (
        <div
            ref={ref}
            id="disqus_thread"
            style={{
                display: props.display ? "block" : "none"
            }}
        >
            <DiscussionEmbed
                shortname='<COMIC_SHORTNAME_HERE>'
                config={
                    {
                        url: window.location.href,
                        identifier: props.post.id.toString() + ' ' + props.post.guid.rendered.toString().replace('#038;', ''),
                        title: props.post.title.rendered
                    }
                }
            />
        </div>
    );
});

export default DisqusComments;

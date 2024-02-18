import './index.css';

import { ForwardedRef, forwardRef } from 'react';
import { DiscussionEmbed } from 'disqus-react';

import { IPost } from '../ThePost';
import { IComicPost } from '../TheComic';
import { IPage } from '../ThePage';

interface IDisqusCommentsProps {
    post: IPost | IComicPost | IPage,
    display: boolean
}

const DisqusComments = forwardRef((props: IDisqusCommentsProps, ref: ForwardedRef<any>): JSX.Element => {
    return (
        <div
            ref={ref}
            id="disqus"
            style={{
                display: props.display ? "block" : "none"
            }}
        >
            <DiscussionEmbed
                shortname='talesfromsomewhere'
                config={
                    {
                        url: window.location.href,
                        identifier: props.post.id.toString(),
                        title: props.post.title.rendered
                    }
                }
            />
        </div>
    );
});

export default DisqusComments;
import { DiscussionEmbed } from 'disqus-react';

import { Post } from '../../context/Context';

import './index.css';

interface IDisqusCommentsProps {
    post: Post
    display: boolean
}

const DisqusComments = ({ post, display }: IDisqusCommentsProps): JSX.Element => {
    return (
        <div
            id="disqus"
            style={{
                display: display ? "block" : "none"
            }}
        >
            <DiscussionEmbed
                shortname='talesfromsomewhere'
                config={
                    {
                        url: window.location.href,
                        identifier: post.id.toString(),
                        title: post.title.rendered
                    }
                }
            />
        </div>
    );
}

export default DisqusComments;
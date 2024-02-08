import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

import './index.css';

const DisqusComments = ({ post, display }) => {
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
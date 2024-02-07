import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

import './index.css';

const DisqusComments = ({ post }) => {
    return (
        <div id="disqus">
            <DiscussionEmbed
                shortname='talesfromsomewhere'
                config={
                    {
                        url: window.location.href,
                        identifier: post.id,
                        title: post.title.rendered
                    }
                }
            />
        </div>
    );
}

export default DisqusComments;
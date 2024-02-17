import { DiscussionEmbed } from 'disqus-react';

import { IPost } from '../ThePost';
import { IComicPost } from '../TheComic';
import { IPage } from '../ThePage';

import './index.css';

interface IDisqusCommentsProps {
    post: IPost | IComicPost | IPage,
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
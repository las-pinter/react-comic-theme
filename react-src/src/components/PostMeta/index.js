import React from 'react';
import Moment from 'react-moment';
import WithConsumer from '../../context/WithConsumer';

const PostMeta = ({ index, context }) => {

    const posts = () => context.posts;
    const item = posts()[index];

    let theMeta = '';
    if (item.type === 'post' || item.type === 'comic') {
        theMeta = (
            <div className="post-meta">
                Published:  <Moment format="MM/DD/YYYY">{item.date}</Moment>,
                Written by {item._embedded.author[0].name}
            </div>)
    }

    return theMeta;

};
export default WithConsumer(PostMeta);
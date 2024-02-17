import Moment from 'react-moment';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { IPost } from '.';

interface IPostMetaProps extends IConsumerProps {
    post?: IPost
}

const PostMeta = ({ post }: IPostMetaProps): JSX.Element => {
    if (!post) {
        return <></>;
    }
    
    let theMeta: JSX.Element = <></>;
    if (post.type === 'post' || post.type === 'comic') {
        theMeta = (
            <div className="post-meta">
                Published:  <Moment format="MM/DD/YYYY">{post.date}</Moment>,
                Written by {post._embedded.author[0].name}
            </div>)
    }

    return theMeta;

};
export default WithConsumer(PostMeta);
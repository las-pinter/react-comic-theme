import Moment from 'react-moment';
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { IPost } from './ThePost';

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
                Published:  <Moment format="DD.MM.YYYY">{post.date}</Moment>
            </div>)
    }

    return theMeta;

};
export default WithConsumer(PostMeta);
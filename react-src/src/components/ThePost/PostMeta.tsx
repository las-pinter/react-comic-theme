import Moment from 'react-moment';
import { IPost } from './ThePost';

interface IPostMetaProps {
    post: IPost
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
export default PostMeta;
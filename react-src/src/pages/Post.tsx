import ThePost from '../components/ThePost';

import "./index.css";

const Post = (): JSX.Element => {
    return (
        <div className="post-single container-vertical">
            <ThePost index={0} />
        </div>
    )

}
export default Post;
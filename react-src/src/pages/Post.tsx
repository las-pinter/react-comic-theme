import "./index.css";

import { useEffect, useState } from 'react';
import ThePost, { IPost } from '../components/ThePost';
import Axios from 'axios';

interface IPostProps {
    slug: string
}

const Post = ({ slug }: IPostProps): JSX.Element => {
    const [post, setPost] = useState<IPost | null>(null);

    const getPost = (slug: string) => {
        let url = '/wp-json/wp/v2/posts/?slug=' + slug + '&_embed';
        return Axios.get(url).then((response) => {
            setPost(response.data[0]);
        }).catch(() => {
        });
    }

    useEffect(() => {
        if (!slug) {
            return;
        }
        
        getPost(slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (!post) {
        return <></>;
    }

    return (
        <div className="post-single container-vertical">
            <ThePost post={post} displayComments={true} />
        </div>
    )

}
export default Post;
import "./index.css";

import { useEffect, useState } from 'react';
import ThePost, { IPost } from '../components/ThePost';
import Axios from 'axios';

import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';


interface IPostProps extends IConsumerProps {}

const Post = ({ context }: IPostProps): JSX.Element => {
    const [post, setPost] = useState<IPost | null>(null);

    const getPost = (slug: string) => {
        let url = '/wp-json/wp/v2/posts/?slug=' + slug + '&_embed';
        return Axios.get(url).then((response) => {
            setPost(response.data[0]);
        }).catch(() => {
        });
    }

    useEffect(() => {
        if (!context.slug) {
            return;
        }
        
        getPost(context.slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.slug]);

    if (!post) {
        return <></>;
    }

    return (
        <div className="post-single container-vertical">
            <ThePost post={post} displayComments={true} />
        </div>
    )

}
export default WithConsumer(Post);
import './index.css';

import { useEffect, useState } from 'react';
import ThePost, { IPost } from '../components/ThePost/ThePost';

import RestHandler from '../rest/RestHandler';
import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

interface IPostProps extends IConsumerProps {
    slug?: string
}

const Post = ({ context, slug }: IPostProps): JSX.Element => {
    const [post, setPost] = useState<IPost | null>(null);

    const getPost = (slug: string) => {
        context.addLoading();
        let url = '/wp-json/wp/v2/posts/?slug=' + slug + '&_embed';
        return RestHandler.get(url).then((response) => {
            let post = response.data[0];
            setPost(post);
            document.title = post.title.rendered + " | Tales From Somewhere";
        }).catch(() => {
        }).finally(() => {
            context.removeLoading();
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
export default WithConsumer(Post);
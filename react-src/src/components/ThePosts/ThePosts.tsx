import ThePost, { IPost } from '../ThePost/ThePost';

interface IThePostsProps {
    posts: Array<IPost>,
}

const ThePosts = ({ posts }: IThePostsProps): JSX.Element => {
    const thePosts = posts;
    let results = <></>;

    if (thePosts.length === 0) {
        results = <div className="no-results"></div>;
    } else {
        results = <>
            {
                thePosts.map(function (post, i) {
                    return <ThePost key={'post-list-' + i} post={post} displayComments={false}></ThePost>
                })
            }
        </>
    }

    return (results);
};

export default ThePosts;
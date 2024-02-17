import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import ThePost from '../ThePost';

interface IThePostsProps extends IConsumerProps {}

const ThePosts = ({ context }: IThePostsProps): JSX.Element => {
    const thePosts = context.posts;
    let results = <></>;

    if (thePosts.length === 0) {
        results = <div className="no-results"></div>;
    } else {
        results = <>
            {
                thePosts.map(function (_, i) {
                    return <ThePost key={'post-list-' + i} index={i}></ThePost>
                })
            }
        </>
    }

    return (results);
};

export default WithConsumer(ThePosts);
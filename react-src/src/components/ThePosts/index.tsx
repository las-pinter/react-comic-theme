import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import ThePost from '../ThePost';

const ThePosts = ({ context }: IConsumerProps): JSX.Element => {
    const thePosts = context.posts;
    let results = <></>;

    if (thePosts.length === 0) {
        results = <div className="no-results"></div>;
    } else {
        results = <>
            {
                thePosts.map(function (item, i) {
                    return <ThePost key={'post-list-' + i} index={i}></ThePost>
                })
            }
        </>
    }

    return (results);
};

export default WithConsumer(ThePosts);
import './index.css';

import { useEffect } from 'react';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

interface IBackgroundProps extends IConsumerProps { }

const Background = ({ context }: IBackgroundProps): JSX.Element => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.slug, context.currentComic.comicSlug])

    return (
        <div className="the-background">
            <img src={context.backgroundImages?.main?.first} alt="" />
        </div>
    );
};

export default WithConsumer(Background);
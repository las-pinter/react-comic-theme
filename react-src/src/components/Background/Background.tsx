import './index.css';

import { useEffect } from 'react';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { MouseParallaxChild, MouseParallaxContainer } from '../../effects/MouseParallax';

interface IBackgroundProps extends IConsumerProps { }

const Background = ({ context }: IBackgroundProps): JSX.Element => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.slug, context.currentComic.comicSlug])

    return (
        <div className="the-background">
            <MouseParallaxContainer useWindowMouseEvents={true}>
                <MouseParallaxChild factorX={0.01} factorY={0}>
                    <img src={context.backgroundImages?.main?.first} alt="" />
                </MouseParallaxChild>
            </MouseParallaxContainer>
        </div>
    );
};

export default WithConsumer(Background);
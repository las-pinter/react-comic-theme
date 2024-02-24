import './index.css';

import { useEffect } from 'react';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { MouseParallaxChild, MouseParallaxContainer } from '../../effects/MouseParallax';

interface IBackgroundProps extends IConsumerProps { }

const Background = ({ context }: IBackgroundProps): JSX.Element => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.slug, context.currentComic.comicSlug])

    const firstLayerSpeed = 0.01;
    const secondLayerSpeed = 2 * firstLayerSpeed;
    const thirdLayerSpeed = 3 * secondLayerSpeed;

    return (
        <div className="the-background">
            <MouseParallaxContainer
                className="background-image-container-wrapper masked-left-right"
                useWindowMouseEvents={true}
                resetOnLeave={true}
            >
                <MouseParallaxChild
                    className="background-image-container"
                    factorX={firstLayerSpeed}
                    factorY={0}
                >
                    <img className="fadeIn" src={context.backgroundImages?.main?.first} alt="" />
                </MouseParallaxChild>
                <MouseParallaxChild
                    className="background-image-container"
                    factorX={secondLayerSpeed}
                    factorY={0}
                >
                    <img className="fadeIn" src={context.backgroundImages?.main?.second} alt="" />
                </MouseParallaxChild>
                <MouseParallaxChild
                    className="background-image-container"
                    factorX={thirdLayerSpeed}
                    factorY={0}
                >
                    <img className="fadeIn" src={context.backgroundImages?.main?.third} alt="" />
                </MouseParallaxChild>
            </MouseParallaxContainer>
        </div>
    );
};

export default WithConsumer(Background);
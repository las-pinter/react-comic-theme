import './index.css';

import { useRef } from 'react';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { MouseParallaxChild, MouseParallaxContainer } from '../../effects/MouseParallax';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface IBackgroundProps extends IConsumerProps { }

const Background = ({ context }: IBackgroundProps): JSX.Element => {
    const firstNodeRef = useRef<any>(null);
    const secondNodeRef = useRef<any>(null);
    const thirdNodeRef = useRef<any>(null);

    const firstLayerSpeed = 0.01;
    const secondLayerSpeed = 2 * firstLayerSpeed;
    const thirdLayerSpeed = 3 * secondLayerSpeed;

    let theBackground = context.currentComic.locationSlug ? context.backgroundImages?.[context.currentComic.locationSlug] : context.backgroundImages?.main;

    let firstLayerImage = theBackground?.first ? theBackground?.first : '';
    let secondLayerImage = theBackground?.second ? theBackground?.second : '';
    let thirdLayerImage = theBackground?.third ? theBackground?.third : '';

    return (
        <div className="the-background">
            <MouseParallaxContainer
                className="background-image-container-wrapper"
                useWindowMouseEvents={true}
                resetOnLeave={true}
            >
                <MouseParallaxChild
                    className="background-image-container"
                    factorX={firstLayerSpeed}
                    factorY={0}
                >
                    <SwitchTransition mode={"out-in"}>
                        <CSSTransition
                            classNames="fader"
                            nodeRef={firstNodeRef}
                            appear={true}
                            mountOnEnter={true}
                            unmountOnExit={true}
                            timeout={10000}
                            addEndListener={(done: () => void) => {
                                firstNodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={firstLayerImage}
                        >
                            <img ref={firstNodeRef} src={firstLayerImage} alt="" />
                        </CSSTransition>
                    </SwitchTransition>
                </MouseParallaxChild>
                <MouseParallaxChild
                    className="background-image-container"
                    factorX={secondLayerSpeed}
                    factorY={0}
                >
                    <SwitchTransition mode={"out-in"}>
                        <CSSTransition
                            classNames="fader"
                            nodeRef={secondNodeRef}
                            appear={true}
                            mountOnEnter={true}
                            unmountOnExit={true}
                            timeout={10000}
                            addEndListener={(done: () => void) => {
                                secondNodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={secondLayerImage}
                        >
                            <img ref={secondNodeRef} src={secondLayerImage} alt="" />
                        </CSSTransition>
                    </SwitchTransition>
                </MouseParallaxChild>
                <MouseParallaxChild
                    className="background-image-container"
                    factorX={thirdLayerSpeed}
                    factorY={0}
                >
                    <div className="background-darkness" />
                    <SwitchTransition mode={"out-in"}>
                        <CSSTransition
                            classNames="fader"
                            nodeRef={thirdNodeRef}
                            appear={true}
                            mountOnEnter={true}
                            unmountOnExit={true}
                            timeout={10000}
                            addEndListener={(done: () => void) => {
                                thirdNodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={thirdLayerImage}
                        >
                            <img ref={thirdNodeRef} src={thirdLayerImage} alt="" />
                        </CSSTransition>
                    </SwitchTransition>
                    <div className="background-darkness" />
                </MouseParallaxChild>
                <MouseParallaxChild
                    className="background-image-container"
                    factorX={firstLayerSpeed}
                    factorY={0}
                >
                    <div className="background-darkness" />
                    <img src={firstLayerImage} alt="" style={{ visibility: 'hidden' }} />
                    <div className="background-darkness" />
                </MouseParallaxChild>
            </MouseParallaxContainer>
        </div>
    );
};

export default WithConsumer(Background);
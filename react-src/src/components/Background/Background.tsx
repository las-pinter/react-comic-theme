import './index.css';

import { useCallback, useRef, useState } from 'react';
import {useWindowDimensions} from 'react-native';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { MouseParallaxChild, MouseParallaxContainer } from '../../effects/MouseParallax';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface IBackgroundProps extends IConsumerProps { }

const Background = ({ context }: IBackgroundProps): JSX.Element => {
    const {width} = useWindowDimensions();

    const fullImageNodeRef = useRef<any>(null);
    const firstNodeRef = useRef<any>(null);
    const secondNodeRef = useRef<any>(null);
    const thirdNodeRef = useRef<any>(null);

    const [firstVoidWidth, setFirstVoidWidth] = useState(0);
    const [secondVoidWidth, setSecondVoidWidth] = useState(0);

    const firstImageRef = useCallback((node: any) => {
        if (!node) {
            return;
        }
        const resizeObserver = new ResizeObserver(() => {
            setSecondVoidWidth(node.getBoundingClientRect().width)
        });
        resizeObserver.observe(node);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const thirdImageRef = useCallback((node: any) => {
        if (!node) {
            return;
        }
        const resizeObserver = new ResizeObserver(() => {
            setFirstVoidWidth(node.getBoundingClientRect().width)
        });
        resizeObserver.observe(node);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const firstLayerSpeed = 0.01;
    const secondLayerSpeed = 2 * firstLayerSpeed;
    const thirdLayerSpeed = 3 * secondLayerSpeed;

    let theBackground = context.backgroundImages?.main;

    if (context.backgroundImages?.[context.currentComic.locationSlug] &&
        context.backgroundImages?.[context.currentComic.locationSlug]?.full !== '') {
        theBackground = context.backgroundImages?.[context.currentComic.locationSlug]
    }

    let fullImage = theBackground?.first ? theBackground?.full : '';
    let firstLayerImage = theBackground?.first ? theBackground?.first : '';
    let secondLayerImage = theBackground?.second ? theBackground?.second : '';
    let thirdLayerImage = theBackground?.third ? theBackground?.third : '';

    return (
        <div className="the-background">
            {
                width >= context.mediumScreenWidth
                    ?
                    <MouseParallaxContainer
                        className="background-image-container-wrapper"
                        useWindowMouseEvents={true}
                        resetOnLeave={true}
                    >
                        <MouseParallaxChild
                            className="background-image-container"
                            factorX={firstLayerSpeed}
                            factorY={0}
                            style={
                                {
                                    transform: 'translateZ(0px)'
                                }
                            }
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
                                    <div ref={firstNodeRef}>
                                        <img className="background-first" ref={firstImageRef} src={firstLayerImage} alt="" />
                                    </div>
                                </CSSTransition>
                            </SwitchTransition>
                        </MouseParallaxChild>
                        <MouseParallaxChild
                            className="background-image-container"
                            factorX={secondLayerSpeed}
                            factorY={0}
                            style={
                                {
                                    transform: 'translateZ(1px)'
                                }
                            }
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
                                    <div ref={secondNodeRef}>
                                        <img className="background-second" src={secondLayerImage} alt="" />
                                    </div>
                                </CSSTransition>
                            </SwitchTransition>
                        </MouseParallaxChild>
                        <MouseParallaxChild
                            className="background-image-container"
                            factorX={thirdLayerSpeed}
                            factorY={0}
                            style={
                                {
                                    transform: 'translateZ(2px)'
                                }
                            }
                        >
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
                                    <div ref={thirdNodeRef}>
                                        <img className="background-third" ref={thirdImageRef} src={thirdLayerImage} alt="" />
                                    </div>
                                </CSSTransition>
                            </SwitchTransition>
                        </MouseParallaxChild>
                        <MouseParallaxChild
                            className="background-image-container"
                            factorX={thirdLayerSpeed}
                            factorY={0}
                            style={
                                {
                                    transform: 'translateZ(3px)'
                                }
                            }
                        >
                            <div className="background-darkness" />
                            <div>
                                <div
                                    className="void-background overlayed-left-right"
                                    style={{
                                        width: firstVoidWidth + "px",
                                    }}
                                />
                            </div>
                            <div className="background-darkness" />
                        </MouseParallaxChild>
                        <MouseParallaxChild
                            className="background-image-container"
                            factorX={firstLayerSpeed}
                            factorY={0}
                            style={
                                {
                                    transform: 'translateZ(4px)'
                                }
                            }
                        >
                            <div className="background-darkness" />
                            <div>
                                <div
                                    className="void-background overlayed-left-right"
                                    style={{
                                        width: secondVoidWidth + "px",
                                    }}
                                />
                            </div>
                            <div className="background-darkness" />
                        </MouseParallaxChild>
                    </MouseParallaxContainer>
                    :
                    <div className="background-image-container-wrapper">
                        <div className="background-image-container">
                            <SwitchTransition mode={"out-in"}>
                                <CSSTransition
                                    classNames="fader"
                                    nodeRef={fullImageNodeRef}
                                    appear={true}
                                    mountOnEnter={true}
                                    unmountOnExit={true}
                                    timeout={10000}
                                    addEndListener={(done: () => void) => {
                                        fullImageNodeRef.current?.addEventListener("transitionend", done, false);
                                    }}
                                    key={fullImage}
                                >
                                    <div ref={fullImageNodeRef}>
                                        <img className="background-full" ref={fullImageNodeRef} src={fullImage} alt="" />
                                    </div>
                                </CSSTransition>
                            </SwitchTransition>
                        </div>
                    </div>
            }
        </div>
    );
};

export default WithConsumer(Background);
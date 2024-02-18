import React, {
    useRef,
} from 'react';

import { CSSTransition } from 'react-transition-group';

interface IFadeInOutProps {
    show: boolean,
    children?: React.ReactNode
}

const FadeInOut = (props: IFadeInOutProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    return (
        <CSSTransition
            classNames="fader"
            addEndListener={(done: () => void) => {
                nodeRef.current?.addEventListener("transitionend", done, false);
            }}
            nodeRef={nodeRef}
            appear={true}
            in={props.show}
        >
            {
                React.cloneElement(React.Children.only(props.children) as React.ReactElement<any>, {
                    ref: nodeRef,
                })
            }
        </CSSTransition>
    );
}

export default FadeInOut;
import React, {
    useRef,
} from 'react';

import { CSSTransition } from 'react-transition-group';

interface IFadeInOutProps {
    show: boolean,
    children?: React.ReactNode
}

const FadeInOut = (props: IFadeInOutProps): JSX.Element => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            classNames="fadeinout"
            timeout={300}
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
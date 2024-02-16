import React, {
    useRef,
} from 'react';

import { CSSTransition } from 'react-transition-group';
import { IProps } from '../context/Context';

interface IFadeInOutProps extends IProps {
    show: boolean
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
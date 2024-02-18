import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import { SwitchTransition, CSSTransition } from 'react-transition-group';

import './index.css';

interface IFadeSwitchLoaderProps {
    depend: any,
    children?: React.ReactNode,
}

const FadeSwitchLoader = (props: IFadeSwitchLoaderProps): JSX.Element => {
    const {
        children,
        depend: _depend,
        ...childProps
    } = props;

    const nodeRef = useRef<any>(null);
    const [theContent, setTheContent] = useState<React.ReactNode | null>(<></>);
    const [theKey, setTheKey] = useState(true);

    useEffect(() => {
        if (props.children === undefined) {
            return;
        }
        setTheContent(props.children ? props.children : <></>);
        setTheKey((prev) => {
            return !prev
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.depend]);

    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                {...childProps}
                classNames="fader"
                timeout={3000}
                nodeRef={nodeRef}
                appear={true}
                addEndListener={(done: () => void) => {
                    nodeRef.current?.addEventListener("transitionend", done, false);
                }}
                key={theKey.toString()}
            >
                {
                    React.cloneElement(React.Children.only(theContent) as React.ReactElement<any>, {
                        ref: nodeRef
                    })
                }
            </CSSTransition>
        </SwitchTransition>
    );
}

export default FadeSwitchLoader;
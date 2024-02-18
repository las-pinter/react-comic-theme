import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import { SwitchTransition, CSSTransition } from 'react-transition-group';

import './index.css';

interface IFaderProps {
    depend: any,
    children?: React.ReactNode,
}

const Fader = (props: IFaderProps): JSX.Element => {
    const nodeRef = useRef<any>(null);
    const [theContent, setTheContent] = useState<React.ReactNode | null>(null);
    const [theKey, setTheKey] = useState(true);

    useEffect(() => {
        if (props.children === undefined) {
            return;
        }
        setTheContent(props.children ? props.children : '');
        setTheKey((prev) => {
            return !prev
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.depend]);

    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                classNames="fader"
                timeout={3000}
                nodeRef={nodeRef}
                appear={true}
                addEndListener={(done: () => void) => {
                    nodeRef.current?.addEventListener("transitionend", done, false);
                  }}
                key={theKey.toString()}
            >
                <div ref={nodeRef}>
                    {theContent}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
}

export default Fader;
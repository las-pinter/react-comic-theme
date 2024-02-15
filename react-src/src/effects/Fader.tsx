import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import { Transition } from 'react-transition-group';
import { IProps } from '../context/Context';

const Fader = (props: IProps): JSX.Element => {
    const nodeRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [theContent, setTheContent] = useState<React.ReactNode | null>(null);
    const duration = props.duration ? props.duration : 300;

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            if (props.children === undefined) {
                setLoading(false);
                return;
            }
            setTheContent(props.children ? props.children : '');
            setLoading(false);
        }, duration)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.depend]);

    const defaultStyle = {
        transition: 'opacity ' + duration + 'ms ease-in-out',
        opacity: 0,
    }

    const transitionStyles: { [id: string]: React.CSSProperties } = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };

    return (
        <Transition
            classNames="fader"
            timeout={duration}
            nodeRef={nodeRef}
            appear={true}
            in={!loading}
        >
            {state => (
                <div
                    ref={nodeRef}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                >
                    {theContent}
                </div>
            )}
        </Transition>
    );
}

export default Fader;
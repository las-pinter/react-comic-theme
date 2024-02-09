import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import { Transition } from 'react-transition-group';

const Fader = (props) => {
    const nodeRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [theContent, setTheContent] = useState('');
    const duration = props.duration ? props.duration : 300;

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setTheContent(props.children);
            setLoading(false);
        }, duration)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.depend]);

    const defaultStyle = {
        transition: 'opacity ' + duration + 'ms ease-in-out',
        opacity: 0,
    }

    const transitionStyles = {
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
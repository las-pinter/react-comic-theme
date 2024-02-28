import './index.css';

import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface IComicTitleProps {
    chapterName: string,
    pageNumber: number,
    title: string
}

const ComicTitle = ({ chapterName, pageNumber, title }: IComicTitleProps) => {
    const nodeRef = useRef<any>(null);

    return (
        <div className="comic-title-wrapper container-style">
            <SwitchTransition mode={"out-in"}>
                <CSSTransition
                    classNames="fader"
                    timeout={3000}
                    nodeRef={nodeRef}
                    appear={true}
                    addEndListener={(done: () => void) => {
                        nodeRef.current?.addEventListener("transitionend", done, false);
                    }}
                    key={title}
                >
                    <div ref={nodeRef} className="comic-title">
                        <p>{"Chapter: " + chapterName + " Page: " + pageNumber}</p>
                        {title}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

export default ComicTitle;
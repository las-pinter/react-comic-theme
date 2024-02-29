import './index.css';

import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface IComicTitleProps {
    chapterNumber: number,
    pageNumber: number,
    title: string
}

const ComicTitle = ({ chapterNumber, pageNumber, title }: IComicTitleProps) => {
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
                        {"Chapter " + chapterNumber + " - Page " + pageNumber + " - " + title}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div >
    );
};

export default ComicTitle;
import Fader from "../../effects/Fader";

import './index.css';

interface IComicTitleProps {
    title: string
}

const ComicTitle = ({ title }: IComicTitleProps) => {
    return (
        <Fader depend={title}>
            <div className="comic-title">
                {title}
            </div>
        </Fader>
    );
};

export default ComicTitle;
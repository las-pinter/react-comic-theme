import React from "react";
import { Link } from "react-router-dom";

import './index.css';

interface IComicSelectorNavigatorProps {
    link: string,
    text: string
}

const ComicSelectorNavigator = ({ link, text }: IComicSelectorNavigatorProps): JSX.Element => {
    return (
        <div className="comic-selector-nav-wrapper">
            <Link
                to={link}
                className="comic-selector-nav"
            >
                {text}
            </Link>
        </div>
    );
};

export default ComicSelectorNavigator;
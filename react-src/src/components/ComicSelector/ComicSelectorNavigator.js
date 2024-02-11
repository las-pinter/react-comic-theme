import React from "react";
import { Link } from "react-router-dom";

import './index.css';

const ComicSelectorNavigator = ({ link, text }) => {
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
import React, { useState } from "react";
import { Link } from "react-router-dom";

import './index.css';

const ComicSelectorNavigator = ({ link, text }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="comic-selector-nav-wrapper"
            onMouseEnter={e => {
                setVisible(true);
            }}

            onMouseLeave={e => {
                setVisible(false);
            }}
        >
            <Link
                to={link}
                className="comic-selector-nav"
                style={{ visibility: visible ? 'visible' : 'hidden' }}
            >
                {text}
            </Link>
        </div>
    );
};

export default ComicSelectorNavigator;
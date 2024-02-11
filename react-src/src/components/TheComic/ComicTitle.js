import React from "react";

import './index.css';
import Fader from "../../effects/Fader";

const ComicTitle = ({ title }) => {
    return (
        <Fader depend={title}>
            <div className="comic-title">
                {title}
            </div>
        </Fader>
    );
};

export default ComicTitle;
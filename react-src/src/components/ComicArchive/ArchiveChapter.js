import React from "react";

import ArchiveComicItem from "./ArchiveComicItem";

import './index.css';

const ArchiveChapter = ({ chapter }) => {
    return (
        <div className="archive-chapter-wrapper container-vertical">
            <h2 className="chapter-name">{chapter['name']}</h2>
            <div className="archive-chapter container-horizontal">
                {
                    chapter['comics'].map((comic, i) => {
                        return (
                            <ArchiveComicItem
                                key={comic['slug'] + '_' + i}
                                comic={comic}
                                number={i}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default ArchiveChapter;
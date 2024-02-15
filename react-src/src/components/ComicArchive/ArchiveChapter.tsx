import ArchiveComicItem from "./ArchiveComicItem";

import './index.css';

export type ComicItem = {
    name: string,
    slug: string,
    permalink: string,
    thumbnail: string
}

interface IArchiveChapterProps {
    chapter: {
        name: string,
        comics: ComicItem[]
    }
}

const ArchiveChapter = ({ chapter }: IArchiveChapterProps): JSX.Element => {
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
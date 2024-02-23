import './index.css';

import { useEffect, useState } from 'react';
import Axios from 'axios';

import TheComic, { IComicPost } from '../components/TheComic/TheComic';
import { TheComicPost } from '../components/ThePost/ThePost';
import Sidebar from '../components/Sidebar/Sidebar';

interface IComicProps {
    comicPageSlug: string,
    comicPageFullSlug: string
}

const Comic = ({ comicPageSlug, comicPageFullSlug }: IComicProps): JSX.Element => {
    const [comic, setComic] = useState<IComicPost | null>(null);

    const getComic = (slug: string) => {
        let url = '/wp-json/wp/v2/comic?slug=' + slug + '&_embed';
        return Axios.get(url).then((response) => {
            setComic(response.data[0]);
        }).catch(() => {
        });
    }

    useEffect(() => {
        if (!comicPageSlug) {
            return;
        }
        
        getComic(comicPageSlug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicPageSlug]);

    if (!comic) {
        return <></>;
    }

    return (
        <div className="comic-page container-vertical">
            <TheComic comicPost={comic} />
            <Sidebar sidebarId='under-comic' background={true} />
            <TheComicPost post={comic} comicPageFullSlug={comicPageFullSlug} />
        </div>
    )

}
export default Comic;
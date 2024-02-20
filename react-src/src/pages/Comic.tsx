import "./index.css";

import { useEffect, useState } from 'react';
import Axios from 'axios';

import TheComic, { IComicPost } from '../components/TheComic';
import { TheComicPost } from '../components/ThePost';

import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

interface IComicProps extends IConsumerProps {}

const Comic = ({ context }: IComicProps): JSX.Element => {
    const [comic, setComic] = useState<IComicPost | null>(null);

    const getComic = (slug: string) => {
        let url = '/wp-json/wp/v2/comic?slug=' + slug + '&_embed';
        return Axios.get(url).then((response) => {
            setComic(response.data[0]);
        }).catch(() => {
        });
    }

    useEffect(() => {
        if (!context.currentComic.comicPageSlug) {
            return;
        }
        
        getComic(context.currentComic.comicPageSlug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.currentComic.comicPageSlug]);

    if (!comic) {
        return <></>;
    }

    return (
        <div className="comic-page container-vertical">
            <TheComic comicPost={comic} />
            <TheComicPost post={comic} comicPageFullSlug={context.currentComic.comicPageFullSlug} />
        </div>
    )

}
export default WithConsumer(Comic);
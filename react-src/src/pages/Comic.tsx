import { useEffect, useState } from 'react';
import Axios from 'axios';

import TheComic, { IComicPost } from '../components/TheComic';
import { TheComicPost } from '../components/ThePost';

import "./index.css";
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
        if (!context.currentComic.comicSlug) {
            return;
        }
        
        getComic(context.currentComic.comicSlug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.currentComic.comicSlug]);

    if (!comic) {
        return <></>;
    }

    return (
        <div className="comic-page container-vertical">
            <TheComic comicPost={comic} />
            <TheComicPost post={comic} comicFullSlug={context.currentComic.comicFullSlug} />
        </div>
    )

}
export default WithConsumer(Comic);
import './index.css';

import { useEffect, useState } from 'react';

import RestHandler from '../rest/RestHandler';

import TheComic, { IComicPost } from '../components/TheComic/TheComic';
import ThePost from '../components/ThePost/ThePost';
import Sidebar from '../components/Sidebar/Sidebar';
import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

interface IComicProps extends IConsumerProps {
    comicPageSlug?: string,
    comicPageFullSlug?: string
}

const Comic = ({ context, comicPageSlug, comicPageFullSlug }: IComicProps): JSX.Element => {
    const [comic, setComic] = useState<IComicPost | null>(null);

    const getComic = (slug: string) => {
        context.addLoading();
        let url = '/wp-json/wp/v2/comic?slug=' + slug + '&_embed';
        return RestHandler.get(url).then((response) => {
            let theComic = response.data[0];
            setComic(theComic);
            context.setComicLocation(theComic?._embedded['wp:term'][3][0].slug)
        }).catch(() => {
        }).finally(() => {
            context.removeLoading();
        });
    }

    useEffect(() => {
        if (!comicPageSlug) {
            return;
        }
        
        getComic(comicPageSlug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicPageSlug]);

    if (!comic || !comicPageFullSlug) {
        return <></>;
    }

    return (
        <div className="comic-page container-vertical">
            <TheComic comicPost={comic} />
            <Sidebar sidebarId='under-comic' background={true} />
            <ThePost post={comic} displayComments={true} comicPageFullSlug={comicPageFullSlug} />
        </div>
    )

}
export default WithConsumer(Comic);
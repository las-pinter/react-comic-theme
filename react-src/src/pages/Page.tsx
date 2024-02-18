import { useEffect, useState } from 'react';
import Axios from 'axios';
import ThePage, { IPage } from '../components/ThePage';
import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

import "./index.css";

interface IPageProps extends IConsumerProps { }

const Page = ({ context }: IPageProps): JSX.Element => {
    const [page, setPage] = useState<IPage | null>(null);

    const getPage = (slug: string) => {
        let url = '/wp-json/wp/v2/pages/?slug=' + slug + '&_embed';
        return Axios.get(url).then((response) => {
            setPage(response.data[0]);
        }).catch(() => {
        });
    }

    useEffect(() => {
        if (!context.slug) {
            return;
        }

        getPage(context.slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.slug]);

    if (!page) {
        return <></>;
    }

    return (
        <div className="page-single container-vertical">
            <ThePage page={page} />
        </div>
    )

}
export default WithConsumer(Page);
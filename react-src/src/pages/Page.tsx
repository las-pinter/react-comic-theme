import './index.css';

import { useEffect, useState } from 'react';

import RestHandler from '../rest/RestHandler';

import ThePage, { IPage } from '../components/ThePage/ThePage';
import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

interface IPageProps extends IConsumerProps {
    slug?: string
}

const Page = ({ context, slug }: IPageProps): JSX.Element => {
    const [page, setPage] = useState<IPage | null>(null);

    const getPage = (slug: string) => {
        context.addLoading();
        let url = '/wp-json/wp/v2/pages/?slug=' + slug + '&_embed';
        return RestHandler.get(url).then((response) => {
            setPage(response.data[0]);
        }).catch(() => {
        }).finally(() => {
            context.removeLoading();
        });
    }

    useEffect(() => {
        if (!slug) {
            return;
        }

        getPage(slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

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
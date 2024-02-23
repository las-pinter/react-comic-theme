import './index.css';

import { useEffect, useState } from 'react';
import Axios from 'axios';

import ThePage, { IPage } from '../components/ThePage/ThePage';

interface IPageProps {
    slug: string
}

const Page = ({ slug }: IPageProps): JSX.Element => {
    const [page, setPage] = useState<IPage | null>(null);

    const getPage = (slug: string) => {
        let url = '/wp-json/wp/v2/pages/?slug=' + slug + '&_embed';
        return Axios.get(url).then((response) => {
            setPage(response.data[0]);
        }).catch(() => {
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
export default Page;
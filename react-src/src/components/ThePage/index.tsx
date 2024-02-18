import { Link } from 'react-router-dom';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

import ComicArchive from '../ComicArchive';
import DisqusComments from '../DisqusComments';
import { IPost } from '../ThePost';

import Fader from '../../effects/Fader';

import './index.css';

export interface IPage extends IPost { }

interface IThePageProps extends IConsumerProps {
    page?: IPage
}

const ThePage = ({ page, context }: IThePageProps): JSX.Element => {
    if (!page) {
        return <></>;
    }

    let theContent = <></>;
    const comicArchive = context.comics.find(comic => comic.archivePage === page.slug);
    if (comicArchive) {
        theContent = <ComicArchive comicSlug={comicArchive.comicSlug} />;
    } else {
        theContent = <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>;
    }

    return (
        <div className="page-wrapper container-vertical">
            <div id={'page-id-' + page.id} className="page-item">
                <Fader depend={page}>
                    <h1><Link to={'/page/' + page.slug}>{page.title.rendered}</Link></h1>
                    {theContent}
                </Fader>
            </div>
            <Fader depend={page}>
                <DisqusComments post={page} display={true} />
            </Fader>
        </div>
    );
};

export default WithConsumer(ThePage);
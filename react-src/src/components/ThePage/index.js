import React, {
    useEffect,
    useState
} from 'react';
import { Link } from 'react-router-dom';

import WithConsumer from '../../wrappers/WithConsumer';

import ComicArchive from '../ComicArchive';
import DisqusComments from '../DisqusComments';

import './index.css';
import Fader from '../../effects/Fader';

const ThePage = ({ context }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        context.getComics().then(() => {
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (context.posts.length === 0 || loading) {
        return;
    }

    const page = context.posts[0]
    const comicArchive = context.comics.find(comic => comic["archivePage"] === page.slug);

    let content = '';
    if (comicArchive) {
        content = <ComicArchive comicSlug={comicArchive.comicSlug} />;
    } else {
        content = <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>;
    }

    return (
        <div className="page-wrapper container-vertical">
            <div id={'page-id-' + page.id} className="page-item">
                <Fader depend={context.posts}>
                    <h1><Link to={'/page/' + page.slug}>{page.title.rendered}</Link></h1>
                    {content}
                </Fader>
            </div>

            <Fader depend={context.posts}>
                <DisqusComments post={page} display={true} />
            </Fader>
        </div>
    );
};

export default WithConsumer(ThePage);
import './index.css'

import { Link } from 'react-router-dom';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

const Title = ({ context }: IConsumerProps): JSX.Element => {
    let currentLogoImage = context.currentComic.comicSlug ? context.logoImages[context.currentComic.comicSlug] : context.logoImages.main;
    let imageTitle = context.currentComic.comicSlug ? context.comics[context.currentComic.comicSlug]['name'] : "Tales From Somewhere";

    return (
        <div className="comic-logo">
            <Link to="/">
                <div className="comic-logo-image">
                    <img src={currentLogoImage} alt={imageTitle} title={imageTitle} />
                </div>
            </Link>
        </div>
    );
}

export default WithConsumer(Title);
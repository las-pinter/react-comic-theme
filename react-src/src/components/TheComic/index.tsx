import {
    useEffect,
    useState
} from 'react';
import Axios from 'axios';

import ComicNavigator, { TComicNavigatorProps } from './ComicNavigator';
import Characters from './Characters';
import ComicTitle from './ComicTitle';

import Fader from '../../effects/Fader';
import { IPost } from '../ThePost';

import './index.css';

export interface IComicPost extends IPost {
    type: 'comic'
}

interface ITheComicProps {
    comicPost: IComicPost
}

const TheComic = ({ comicPost }: ITheComicProps): JSX.Element => {
    const [comicNavLinks, setComicNavLinks] = useState<TComicNavigatorProps>({
        firstPage: '',
        previousPage: '',
        nextPage: '',
        lastPage: ''
    });

    useEffect(() => {
        if (!comicPost) {
            return;
        }

        const id = comicPost.id;
        let requests: Promise<string>[] = [];

        [
            '/wp-json/comics/v1/first/' + id,
            '/wp-json/comics/v1/previous/' + id,
            '/wp-json/comics/v1/next/' + id,
            '/wp-json/comics/v1/last/' + id,
        ].forEach((url) => {
            requests.push(
                Axios.get(url).then((response) => {
                    return response.data;
                }).catch(() => {
                })
            );
        });

        Promise.all(requests).then((values: Array<string>) => {
            setComicNavLinks({
                firstPage: values[0],
                previousPage: values[1],
                nextPage: values[2],
                lastPage: values[3]
            });
        });
    }, [comicPost]);

    if (!comicPost) {
        return <></>;
    }

    let comicImageUrl = '';
    if (comicPost._embedded) {
        if (comicPost._embedded['wp:featuredmedia']) {
            comicImageUrl = comicPost._embedded['wp:featuredmedia'][0].source_url;
        }
    }

    return (
        <div className="the-comic-container">
            <ComicTitle title={comicPost.title.rendered} />
            <div className="navigator-top">
                <ComicNavigator comicNavLinks={comicNavLinks} />
            </div>
            <div id="the-comic">
                <Fader depend={comicPost}>
                    <img src={comicImageUrl} alt={comicPost.title.rendered} title={comicPost.title.rendered} />
                </Fader>
            </div>
            <div className="navigator-bottom">
                <ComicNavigator comicNavLinks={comicNavLinks} />
            </div>
            <Characters comicPost={comicPost} />
        </div>
    );
};

export default TheComic;
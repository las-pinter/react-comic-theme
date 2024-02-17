import { useEffect, useState } from 'react';
import Axios from 'axios';

import ThePosts from '../components/ThePosts';
import Pager from '../components/Pager';
import ComicSelector from '../components/ComicSelector';
import Sidebar from '../components/Sidebar';
import { IPost } from '../components/ThePost';

import "./index.css";

const MainPage = (): JSX.Element => {
    const [postsCurrentPage, setPostsCurrentPage] = useState(1);
    const [postsTotalPages, setPostsTotalPages] = useState(0);
    const [posts, setPosts] = useState<Array<IPost>>([]);

    const getPosts = () => {
        let url = '/wp-json/wp/v2/posts/?page=' + postsCurrentPage + '&per_page=3&_embed';
        return Axios.get(url).then((response) => {
            setPosts(response.data);
            setPostsTotalPages(response.headers['x-wp-totalpages']);
        }).catch(() => {
        });
    }

    const postsNextClicked = () => {
        setPostsCurrentPage((prevState) => {
            return prevState + 1;
        })
        getPosts();
    }

    const postsPreviousClicked = () => {
        setPostsCurrentPage((prevState) => {
            return prevState - 1;
        })
        getPosts();
    }

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="main-page container-vertical">
            <ComicSelector />
            <div className="main-content-wrapper container-horizontal">
                <div className="main-content container-vertical">
                    <ThePosts
                        posts={posts}
                    />
                    <Pager
                        currentPage={postsCurrentPage}
                        totalPages={postsTotalPages}
                        nextClickedCallback={postsNextClicked}
                        previousClickedCallback={postsPreviousClicked}
                    />
                </div>
                <div id="right-to-main-content" className="sidebar-content container-vertical">
                    <Sidebar sidebarId="right-to-main-content" />
                </div>
            </div>
        </div>
    )
}

export default MainPage;

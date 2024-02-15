import ThePosts from '../components/ThePosts';
import Pager from '../components/Pager';
import ComicSelector from '../components/ComicSelector';
import Sidebar from '../components/Sidebar';

import "./index.css";

const MainPage = (): JSX.Element => {
    return (
        <div className="main-page container-vertical">
            <ComicSelector />
            <div className="main-content-wrapper container-horizontal">
                <div className="main-content container-vertical">
                    <ThePosts />
                    <Pager />
                </div>
                <div id="right-to-main-content" className="sidebar-content container-vertical">
                    <Sidebar sidebarId="right-to-main-content" />
                </div>
            </div>
        </div>
    )
}

export default MainPage;

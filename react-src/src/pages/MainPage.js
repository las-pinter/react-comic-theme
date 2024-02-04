import React from 'react';

import WithHeadFoot from './WithHeadFoot';
import WithProvider from '../context/WithProvider';

import ThePosts from '../components/ThePosts';
import Pager from '../components/Pager';
import ComicSelector from '../components/ComicSelector';
import Sidebar from '../components/Sidebar';

import "./index.css";

const MainPage = () => {
    return (
        <div className="main-page container-vertical">
            <div className="content-wrapper container-vertical">
                <ComicSelector />
                <div className="main-content-wrapper container-horizontal">
                    <div className="main-content container-vertical">
                        <ThePosts />
                        <Pager />
                    </div>
                    <div className="sidebar-content container-vertical">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithProvider(WithHeadFoot(MainPage));

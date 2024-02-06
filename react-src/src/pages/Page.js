import React from 'react';

import ThePage from '../components/ThePage';

import "./index.css";

const Page = () => {
    return (
        <div className="page-single container-vertical">
            <div className="content-wrapper container-vertical">
                <ThePage index={0} />
            </div>
        </div>
    )

}
export default Page;
import React from 'react';

import WithHeadFoot from '../wrappers/WithHeadFoot';
import WithProvider from '../wrappers/WithProvider';
import WithConsumer from '../wrappers/WithConsumer';

import MainPage from './MainPage';
import Page from './Page';
import Comic from './Comic';
import Post from './Post';

import "./index.css";
import Fader from '../effects/Fader';

const PageRouter = ({ context }) => {
    return (
        <Fader depend={context.contextType}>
            <div className="content-wrapper container-vertical">
                {
                    (() => {
                        switch (context.contextType) {
                            case 'mainPage':
                                return (<MainPage />);
                            case 'page':
                                return (<Page />);
                            case 'comic':
                                return (<Comic />);
                            case 'post':
                                return (<Post />);
                            default:
                                return (<></>);
                        }
                    })()
                }
            </div>
        </Fader>
    )
}

export default WithProvider(WithHeadFoot(WithConsumer(PageRouter)));

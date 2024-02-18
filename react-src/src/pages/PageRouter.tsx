import WithHeadFoot from '../wrappers/WithHeadFoot';
import WithProvider from '../wrappers/WithProvider';

import MainPage from './MainPage';
import Page from './Page';
import Comic from './Comic';
import Post from './Post';

import Fader from '../effects/Fader';
import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

interface IPageRouterProps extends IConsumerProps{
    contextType?: string
}

const PageRouter = ({ context, contextType }: IPageRouterProps): JSX.Element => {
    return (
        <Fader depend={contextType}>
            <div className="content-wrapper container-vertical">
                {
                    (() => {
                        switch (contextType) {
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

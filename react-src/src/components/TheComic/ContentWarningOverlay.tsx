import { useCookies } from 'react-cookie';
import './index.css';

export interface IContentWarningOverlayProps { }

const ContentWarningOverlay = () => {
    const [cookies, setCookie] = useCookies(['mature_reader']);

    let matureReader = cookies?.mature_reader;

    return (
        matureReader === true
            ?
            <></>
            :
            <div className="content-warning-overlay">
                <div className="content-warning-text">
                    <p>The content of this comic page is for adults.</p>
                    <p>Press the button, if you are fine with that.</p>
                </div>
                <div className="content-warning-buttons">
                    <button
                        onClick={() => {
                            setCookie('mature_reader', true);
                        }}
                    >
                        I'm fine with that
                    </button>
                </div>
            </div>
    );
};

export default ContentWarningOverlay;
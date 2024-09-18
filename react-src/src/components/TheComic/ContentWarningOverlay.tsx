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
                    <p>The content of this comic page is not suitable for minors.</p>
                    <p>If you are a minor, please fetch a parent or guardian to help you.</p>
                    <p>Press the button, if you have already reached adulthood.</p>
                </div>
                <div className="content-warning-buttons">
                    <button
                        onClick={() => {
                            setCookie('mature_reader', true);
                        }}
                    >
                        I'm already 18+, let me see the content.
                    </button>
                </div>
            </div>
    );
};

export default ContentWarningOverlay;
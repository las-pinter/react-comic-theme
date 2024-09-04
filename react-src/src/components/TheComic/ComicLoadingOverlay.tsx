import './index.css';
import { ThreeDots } from 'react-loader-spinner'

export interface IComicLoadingOverlayProps { }

const ComicLoadingOverlay = () => {
    return (
        <div className="comic-loading-overlay">
            <div className="comic-loading-loader-wrapper">
                <ThreeDots
                    visible={true}
                    height="30"
                    width="50"
                    color="#ffffff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </div>
    );
};

export default ComicLoadingOverlay;
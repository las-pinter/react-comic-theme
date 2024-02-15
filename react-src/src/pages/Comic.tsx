import TheComic from '../components/TheComic';
import ThePost from '../components/ThePost';

import "./index.css";

const Comic = (): JSX.Element => {
    return (
        <div className="comic-page container-vertical">
            <TheComic />
            <ThePost index={0} />
        </div>
    )

}
export default Comic;
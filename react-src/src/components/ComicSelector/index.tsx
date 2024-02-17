import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import ComicSelectorNavigator from './ComicSelectorNavigator';

import './index.css';

interface IComicSelectorProps extends IConsumerProps { }

const ComicSelector = ({ context }: IComicSelectorProps): JSX.Element => {   
    return (
        <div className="comic-selector container-horizontal">
            {
                context.comics.map((item, i) => {
                    return (
                        <div key={item.comicSlug + '_' + i} className={"comic-selector-comic container-vertical " + item.comicSlug}>
                            <div className="comic-name">{item.name}</div>
                            <div className="selector-image">
                                <img src="" alt={item.name} />
                            </div>
                            <div className="selector-navigation container-horizontal">
                                <ComicSelectorNavigator link={item.firstPage} text={'First'} />
                                <ComicSelectorNavigator link={'page/' + item.archivePage} text={'Archive'} />
                                <ComicSelectorNavigator link={item.lastPage} text={'Last'} />
                            </div>
                        </div>
                    )
                })
            }
        </div >
    );
};

export default WithConsumer(ComicSelector);
import { IContextState } from '../context/Context';

module ImageHandler{
    /**
     * Load an image from a given URL
     * @param {String} url The URL of the image resource
     * @returns {Promise<Image>} The loaded image
     */
    export const loadImage = (context: IContextState, url: string) => {
        return new Promise(resolve => {
            context.addLoading();
            const image = new Image();
            image.onerror = () => {
                context.removeLoading();
            }
            image.addEventListener('load', () => {
                resolve(image);
                context.removeLoading();
            });
            image.src = url;
        });
    }
}

export default ImageHandler;
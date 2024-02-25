import Axios from 'axios';

module RestHandler {
    export const get = (url: string) => {
        return Axios.get(url);
    }
}

export default RestHandler;
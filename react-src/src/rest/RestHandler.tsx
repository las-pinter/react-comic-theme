import Axios, { AxiosResponse } from 'axios';

module RestHandler {
    const sleeper = (ms: number) => {
        return function(x:any) {
          return new Promise<AxiosResponse<any, any>>(resolve => setTimeout(() => resolve(x), ms));
        };
      }

    export const get = (url: string) => {
        return Axios.get(url).then(sleeper(0));
    }
}

export default RestHandler;
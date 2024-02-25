import Axios, { AxiosResponse } from 'axios';

module RestHandler {
    // This function is for local testing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sleeper = (ms: number) => {
        return (x: any) => {
            return new Promise<AxiosResponse<any, any>>((resolve) => {
                setTimeout(() => {
                    resolve(x);
                }, ms)
            });
        };
    }

    export const get = (url: string) => {
        return Axios.get(url);
    }
}

export default RestHandler;
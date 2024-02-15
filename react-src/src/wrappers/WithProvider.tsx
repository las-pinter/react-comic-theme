import GetCurrentRouteData from '../hooks/CommonHooks';
import { Provider } from '../context/Context';

import type { IProps } from '../context/Context';

const WithProvider = (WrappedComponent: (props: IProps) => JSX.Element) => {
    return function (props: IProps) {
        const routeData = GetCurrentRouteData();
        return (
            <>
                <Provider router={routeData}>
                    <WrappedComponent {...props} />
                </Provider>
            </>
        );
    };
}

export default WithProvider;
import React from 'react';

import GetCurrentRouteData from '../hooks/CommonHooks';
import { Provider } from '../context/Context';

const WithProvider = (WrappedComponent) => {
    return function (props) {
        const routeData = GetCurrentRouteData();
        return (
            <>
                <Provider router={routeData}>
                    { <WrappedComponent {...props} /> }
                </Provider>
            </>
        );
    };
}

export default WithProvider;
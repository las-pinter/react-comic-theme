import { matchRoutes, useLocation } from 'react-router-dom';

import type { RouteMatch } from 'react-router-dom';

const routes = [
    { path: '/' },
    { path: '/:slug' },
    { path: '/page/:slug' },
    { path: '/comic/*' }
]

const GetCurrentRouteData = (): RouteMatch | null => {
    const location = useLocation();
    const matches = matchRoutes(routes, location);

    if (matches) {
        return matches[0];
    }
    return null;
}

export default GetCurrentRouteData;
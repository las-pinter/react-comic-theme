import { matchRoutes, useLocation } from 'react-router-dom'

const routes = [
  { path: '/' },
  { path: '/page/:slug' },
  { path: '/category/:catid' },
  { path: '/post/:slug' },
  { path: '/comic/*' }
]

const GetCurrentRouteData = () => {
  const location = useLocation()
  const matches = matchRoutes(routes, location)
  if (matches) {
    return matches[0];
  }
  return null;
}

export default GetCurrentRouteData;
import React from 'react';

import Head from '../partials/Head';
import TheLoop from '../partials/TheLoop';
import Pager from '../partials/Pager';
import Foot from '../partials/Foot';
import { Provider } from '../context/Context';
import GetCurrentRouteData from '../hooks/CommonHooks';

const MainPage = () => {
  const routeData = GetCurrentRouteData();

  return (
    <Provider router={routeData}>
      <div className="archive">
        <Head></Head>
        <div className="content-area">
          <h1>This is still a WIP site</h1>
          <TheLoop></TheLoop>
          <Pager></Pager>
        </div>
        <Foot></Foot>
      </div>
    </Provider>
  )
}

export default MainPage

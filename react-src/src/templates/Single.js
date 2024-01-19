import React from 'react';

import Head from '../partials/Head';
import TheLoop from '../partials/TheLoop';
import Foot from '../partials/Foot';
import { Provider } from '../context/Context'
import GetCurrentRouteData from '../hooks/CommonHooks';

const Single = () => {
  const routeData = GetCurrentRouteData();

  return (
    <Provider router={routeData} >
      <div className="Post">
        <Head></Head>
        <div className="content-area">
          <TheLoop></TheLoop>
        </div>
        <Foot></Foot>
      </div>
    </Provider>
  )

}
export default Single
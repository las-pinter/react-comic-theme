import React from 'react';

import { Consumer } from './Context';

const WithConsumer = (WrappedComponent) => {
  return function (props) {
    return (
      <Consumer>
        {ctx => <WrappedComponent {...props} context={ctx} />}
      </Consumer>
    );
  };
}

export default WithConsumer;
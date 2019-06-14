import React from 'react';

const FlamelinkContext = React.createContext(null);

export const withFlamelink = Component => props => (
  <FlamelinkContext.Consumer>
    {flamelink => <Component {...props} flamelink={flamelink} />}
  </FlamelinkContext.Consumer>
);

export default FlamelinkContext;

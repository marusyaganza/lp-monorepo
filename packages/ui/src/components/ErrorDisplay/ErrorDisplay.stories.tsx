import React from 'react';

import { ErrorDisplay } from './ErrorDisplay';

export default {
  title: 'ErrorDisplay',
  component: ErrorDisplay
};

export const ErrorDisplayDefault = () => (
  <div className="presentationContent">
    <ErrorDisplay
      subHeading="Something went wrong"
      heading="Some error"
      buttonText="reload"
      headingIcon="error"
      buttonHandler={() => {
        console.log('clicked!');
      }}
    />
  </div>
);

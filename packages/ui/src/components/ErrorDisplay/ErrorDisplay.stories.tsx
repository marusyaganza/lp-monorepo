import React from 'react';

import { ErrorDisplay } from './ErrorDisplay';

export default {
  title: 'ErrorDisplay',
  component: ErrorDisplay
};

export const ErrorDisplayDefault = () => (
  <div className="presentationContent">
    <ErrorDisplay
      heading="Some error"
      buttonText="reload"
      buttonHandler={() => {
        console.log('clicked!');
      }}
    />
  </div>
);

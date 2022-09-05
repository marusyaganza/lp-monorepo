import React, { MouseEventHandler } from 'react';
import { Button } from '../../../../ui/src/components/button/Button';
import { Icon, IconIdType } from '../../../../ui/src/components/Icon/icon';

import './error-display.css';

interface ErrorDisplayProps {
  heading: string;
  headingIcon?: IconIdType;
  subHeading: string;
  buttonHandler: MouseEventHandler;
  buttonText: string;
  theme?: 'red' | 'base';
}

export const ErrorDisplay = ({
  heading,
  headingIcon,
  subHeading,
  buttonHandler,
  buttonText,
  theme = 'base'
}: ErrorDisplayProps) => {
  return (
    <div className="infoContainer">
      <article className="info">
        <h1 className={`mainHeading ${theme}`}>
          {heading}
          {headingIcon && <Icon id={headingIcon} width={100} height={50} />}
        </h1>
        <h2 className="subheading">{subHeading}</h2>
        <div className="buttonContainer">
          <Button size="L" onClick={buttonHandler}>
            {buttonText} <Icon id="reload" width={16} height={16} />
          </Button>
        </div>
      </article>
    </div>
  );
};

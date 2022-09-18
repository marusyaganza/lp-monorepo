import React, { MouseEventHandler } from 'react';

import { Button } from '../Button/Button';
import { Icon, IconIdType } from '../Icon/icon';

import './ErrorDisplay.css';

export interface ErrorDisplayProps {
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
  theme = 'red'
}: ErrorDisplayProps) => {
  return (
    <div className="infoContainer">
      <article>
        <h1 className={`mainHeading ${theme}`}>
          {heading}
          {headingIcon && <Icon id={headingIcon} width={100} height={50} />}
        </h1>
        <h2 className="subheading">{subHeading}</h2>
        <div className="buttonContainer">
          <Button
            onClick={buttonHandler}
            variant="iconWithText"
            iconId="reload"
          >
            {buttonText}
          </Button>
        </div>
      </article>
    </div>
  );
};

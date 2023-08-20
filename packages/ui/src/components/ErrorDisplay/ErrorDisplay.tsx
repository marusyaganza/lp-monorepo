import React, { MouseEventHandler } from 'react';

import { Button } from '../Button/Button';
import errorLogo from '../../assets/img/error-page-logo.svg';
import styles from './ErrorDisplay.module.css';

export interface ErrorDisplayProps {
  heading: string;
  buttonHandler: MouseEventHandler;
  buttonText: string;
}

export const ErrorDisplay = ({
  heading,
  buttonHandler,
  buttonText
}: ErrorDisplayProps) => {
  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <img className={styles.image} src={errorLogo} alt="" />
        <h1 className={styles.heading}>{heading}</h1>
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

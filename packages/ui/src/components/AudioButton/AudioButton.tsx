import React, { useEffect, useMemo } from 'react';
import './AudioButton.css';
import { Icon } from '../Icon/icon';

export interface AudioButtonProps {
  src: string;
  buttonText: string;
  buttonSize?: number;
  autoplay?: boolean;
}

export const AudioButton = ({
  src,
  buttonText,
  buttonSize = 20,
  autoplay
}: AudioButtonProps) => {
  const play = useMemo(
    () => () => {
      const audioElement = new Audio(src);
      audioElement.play();
    },
    [src]
  );

  useEffect(() => {
    if (autoplay) {
      play();
    }
  }, [src, autoplay, play]);

  return (
    <button
      className="playButton"
      type="button"
      onClick={play}
      aria-label="play audio."
    >
      <span className="buttonText">{buttonText}</span>
      <Icon className="icon" id="play" height={buttonSize} width={buttonSize} />
    </button>
  );
};

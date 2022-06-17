import React, { useEffect } from 'react';
import './audio-button.css';
import { Icon } from '../Icon/icon';

interface AudioButtonProps {
  src: string, buttonText: string, buttonSize: number, autoplay?: boolean 
};

export const AudioButton = ({ src, buttonText, buttonSize, autoplay }: AudioButtonProps) => {
  const audioElement = new Audio(src);
  const play = () => {
    audioElement.play();
  };
  useEffect(() => {
    if (autoplay) {
      play();
    }
  }, [src]);

  return (
    <button
      className="playButton"
      type="button"
      onClick={play}
      aria-label="play audio."
    >
      <span className="buttonText">{buttonText}</span>
      <Icon
        className="icon"
        id="play"
        height={buttonSize}
        width={buttonSize}
      />
    </button>
  );
};

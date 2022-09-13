import React, { useEffect, useMemo } from 'react';
import './AudioButton.css';
import { Icon } from '../Icon/icon';

/**AudioButton Props */
//TODO add different props for icon size and text size
export interface AudioButtonProps {
  /**path to the audio file that plays on click */
  src: string;
  /** Text that comes before the audio icon*/
  buttonText?: string;
  /**Size of the audio icon in pixels */
  buttonSize?: number;
  /**If it set to true, audio file will play when AudioButton component is rendered */
  autoplay?: boolean;
}

/**Special type of button that plays audio when you click on it */
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
      {buttonText && <span className="buttonText">{buttonText}</span>}
      <Icon className="icon" id="play" height={buttonSize} width={buttonSize} />
    </button>
  );
};

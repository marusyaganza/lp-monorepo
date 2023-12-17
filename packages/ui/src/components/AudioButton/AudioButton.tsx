import React, { SyntheticEvent, useEffect, useMemo } from 'react';
import { Button, ButtonProps } from '../Button/Button';

/**AudioButton Props */
export interface AudioButtonProps extends ButtonProps {
  /**path to the audio file that plays on click */
  src: string;
  /** Text that comes before the audio icon*/
  buttonText?: string;
  /**If it set to true, audio file will play when AudioButton component is rendered */
  autoplay?: boolean;
}

/**Special type of button that plays audio when you click on it */
export const AudioButton = ({
  src,
  buttonText,
  autoplay,
  ...rest
}: AudioButtonProps) => {
  const play = useMemo(
    () => (e?: SyntheticEvent) => {
      e?.stopPropagation();
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

  const buttonVariant = buttonText ? 'iconWithText' : 'icon';

  return (
    <Button
      data-cy="audioButton"
      type="button"
      onClick={play}
      variant={buttonVariant}
      aria-label="play audio."
      iconId="play"
      {...rest}
    >
      {buttonText}
    </Button>
  );
};

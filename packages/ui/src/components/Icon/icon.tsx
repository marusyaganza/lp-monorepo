import React from 'react';
// @ts-ignore
import sprite from './sprite.svg';

export type IconIdType = 'edit' | 'search' | 'error' | 'reload';

type IconProps = {
  width?: number,
  height?: number,
  id: IconIdType,
  className?: string,
  tooltip?: string
}

export const Icon = ({ width=18, height=18, id, tooltip, className }: IconProps) => {
  const img = `${sprite}#${id}`;
  return (
    <svg
      width={width}
      height={height}
      className={className}
      focusable="false"
      aria-label={tooltip ? undefined : id}
    >
      {tooltip && <title>{tooltip}</title>}
      <use xlinkHref={img} />
    </svg>
  );
};

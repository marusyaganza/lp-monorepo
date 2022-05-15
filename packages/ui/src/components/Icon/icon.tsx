import React from 'react';
import sprite from './sprite.svg';

type IconProps = {
  width?: number,
  height?: number,
  id: 'edit' | 'search',
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

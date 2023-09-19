import React from 'react';
import sprite from '../../assets/icons/sprite.svg';

export type IconIdType =
  | 'edit'
  | 'search'
  | 'error'
  | 'reload'
  | 'book'
  | 'play'
  | 'success'
  | 'close'
  | 'fire'
  | 'home'
  | 'dice'
  | 'brain'
  | 'explorer'
  | 'door'
  | 'dragon'
  | 'eraser'
  | 'arrow-left'
  | 'pointer'
  | 'plus'
  | 'minus'
  | 'desc'
  | 'asc'
  | 'comet'
  | 'up'
  | 'down'
  | 'eye'
  | 'eye-slashed'
  | 'sun'
  | 'git'
  | 'arrow-up'
  | 'arrow-down';

export type IconProps = {
  width?: number;
  height?: number;
  id: IconIdType;
  className?: string;
  tooltip?: string;
};

/**@internal */
export const _iconIds: IconIdType[] = [
  'edit',
  'search',
  'error',
  'reload',
  'book',
  'play',
  'success',
  'close',
  'fire',
  'home',
  'dice',
  'brain',
  'explorer',
  'door',
  'dragon',
  'eraser',
  'arrow-left',
  'arrow-up',
  'arrow-down',
  'pointer',
  'plus',
  'minus',
  'asc',
  'desc',
  'comet',
  'up',
  'down',
  'eye',
  'eye-slashed',
  'sun',
  'git'
];

export const Icon = ({ width, height, id, tooltip, className }: IconProps) => {
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

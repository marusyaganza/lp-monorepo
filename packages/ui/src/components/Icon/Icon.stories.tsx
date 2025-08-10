import React from 'react';
import { Icon, _iconIds } from './icon';

export default {
  title: 'general/Icon',
  component: Icon
};

export const Icons = () => (
  <div className="imagesList">
    {_iconIds.map(id => {
      return (
        <div key={id} className="box">
          <span>{id}</span>
          <Icon id={id} width={30} height={30} />
        </div>
      );
    })}
  </div>
);

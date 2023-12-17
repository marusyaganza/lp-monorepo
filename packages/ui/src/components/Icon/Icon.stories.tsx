import React from 'react';
import { Icon, _iconIds } from './icon';

export default {
  title: 'Icon',
  component: Icon
};

export const Icons = () =>
  _iconIds.map(id => {
    return (
      <div key={id} className="presentationBox">
        <p>{id}</p>
        <Icon id={id} width={50} height={50} />
      </div>
    );
  });

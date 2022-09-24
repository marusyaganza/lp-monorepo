import React from 'react';
import { Icon, IconIdType } from './icon';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Icon',
  component: Icon
};

export const ids: IconIdType[] = [
  'edit',
  'search',
  'error',
  'reload',
  'book',
  'play',
  'maintenance',
  'success',
  'close'
];

export const Icons = () =>
  ids.map(id => {
    return (
      <div key={id} className="presentationBox">
        <p>{id}</p>
        <Icon id={id} width={50} height={50} />
      </div>
    );
  });

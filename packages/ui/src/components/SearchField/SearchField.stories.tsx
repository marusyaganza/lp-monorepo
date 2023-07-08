import React from 'react';
import { SearchField, SearchFieldProps } from './SearchField';
import '../../assets/styles/common-styles.css';

export default {
  title: 'SearchField',
  component: SearchField
};

export const SearchFieldDefault = (args: SearchFieldProps) => {
  return (
    <div className="presentationBox" style={{ width: '50%' }}>
      <SearchField
        {...args}
        onSearch={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

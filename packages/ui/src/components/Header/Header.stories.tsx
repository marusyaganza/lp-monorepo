import React from 'react';
import { Header, HeaderProps } from './Header';
import '../../assets/styles/common-styles.css';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  },
  decorators: [withRouter]
};

const navLinks = [
  { url: '/search', text: 'Search' },
  { url: '/words', text: 'Words' },
  { url: '/games', text: 'Games' }
];

export const HeaderDefault = (args: HeaderProps) => {
  return <Header {...args} navLinks={navLinks} />;
};

import React from 'react';
import { Header, HeaderProps } from './Header';
import { routerDecorator } from '../../storybook-decorators';

export default {
  title: 'general/Header',
  component: Header,
  decorators: [routerDecorator]
};

const navLinks = [
  { url: '/search', text: 'Search' },
  { url: '/words', text: 'Words' },
  { url: '/games', text: 'Games' }
];

export const HeaderDefault = (args: HeaderProps) => {
  return <Header {...args} navLinks={navLinks} />;
};

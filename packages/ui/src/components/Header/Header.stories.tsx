import React from 'react';
import { Language } from '../../generated/graphql';
import { Header, HeaderProps, HeaderLinkType } from './Header';
import { UserMenuItemType } from '../UserMenu/UserMenu';
import { routerDecorator } from '../../storybook-decorators';

const navLinks: HeaderLinkType[] = [
  {
    url: '/',
    text: 'Home',
    icon: 'home'
  },
  {
    url: '/search',
    text: 'Explore',
    icon: 'explorer'
  },
  {
    url: '/words',
    text: 'Vocabulary',
    icon: 'brain'
  },
  {
    url: '/games',
    text: 'Practice',
    icon: 'dice'
  }
];

export default {
  title: 'general/Header',
  component: Header,
  decorators: [routerDecorator]
};

const menuItems: UserMenuItemType[] = [
  {
    url: '/',
    text: 'Profile',
    icon: 'dragon'
  },
  {
    text: 'Logout',
    icon: 'door'
  }
];

export const HeaderDefault = (args: HeaderProps) => {
  return (
    <Header
      {...args}
      navLinks={navLinks}
      userMenuItems={menuItems}
      onLanguageChange={lang => {
        console.log(lang);
      }}
      language={Language.Spanish}
    />
  );
};

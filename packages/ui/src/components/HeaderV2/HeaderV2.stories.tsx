import React from 'react';
import { Language } from '../../generated/graphql';
import { HeaderV2, HeaderV2Props, HeaderLinkType } from './HeaderV2';
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
  title: 'HeaderV2',
  component: HeaderV2,
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

export const HeaderV2Default = (args: HeaderV2Props) => {
  return (
    <HeaderV2
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

import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Language } from '../../generated/graphql';
import { HeaderV2, HeaderV2Props, HeaderLinkType } from './HeaderV2';
import { UserMenuItemType } from '../UserMenu/UserMenu';
import '../../assets/styles/common-styles.css';

export default {
  title: 'HeaderV2',
  component: HeaderV2,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  },
  decorators: [withRouter]
};

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

const menuItems: UserMenuItemType[] = [
  {
    url: '/',
    text: 'Profile',
    icon: 'dragon'
  },
  {
    onClick: () => {
      console.log('log out');
    },
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

import { UserMenu, UserMenuItemType } from './UserMenu';
import {
  styledPreviewDecorator,
  routerDecorator
} from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof UserMenu> = {
  title: 'UserMenu',
  component: UserMenu,
  decorators: [styledPreviewDecorator('centered'), routerDecorator]
};

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

export const UserMenuDefault = {
  args: {
    menuItems
  }
};

export default meta;

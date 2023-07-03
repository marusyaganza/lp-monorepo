import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { UserMenu, UserMenuProps, UserMenuItemType } from './UserMenu';
import '../../assets/styles/common-styles.css';

export default {
  title: 'UserMenu',
  component: UserMenu,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  },
  decorators: [withRouter]
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

export const UserMenuDefault = (args: UserMenuProps) => {
  return (
    <div className="presentationBox" style={{ marginLeft: '200px' }}>
      <UserMenu {...args} menuItems={menuItems} />
    </div>
  );
};

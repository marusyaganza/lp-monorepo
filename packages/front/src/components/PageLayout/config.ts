import { HeaderLinkType, UserMenuItemType, LinkType } from '@lp/ui';
import { routes } from '../../constants/routes';

export const navLinks: HeaderLinkType[] = [
  {
    url: '/',
    text: 'Home',
    icon: 'home'
  },
  {
    url: `/${routes.search}`,
    text: 'Explore',
    icon: 'explorer'
  },
  {
    url: `/${routes.words}`,
    text: 'Vocabulary',
    icon: 'brain'
  },
  {
    url: `/${routes.games}`,
    text: 'Practice',
    icon: 'dice'
  },
  {
    url: `/${routes.tags}`,
    text: 'Tags',
    icon: 'tag'
  }
];

export const mobileNavLinks: HeaderLinkType[] = [
  {
    url: `/${routes.search}`,
    text: 'Explore',
    icon: 'explorer'
  },
  {
    url: `/${routes.words}`,
    text: 'Vocabulary',
    icon: 'brain'
  },
  {
    url: `/${routes.games}`,
    text: 'Practice',
    icon: 'dice'
  },
  {
    url: `/${routes.tags}`,
    text: 'Tags',
    icon: 'tag'
  },
  {
    url: '/profile',
    text: 'Profile',
    icon: 'dragon'
  }
];

export const menuItems = (onLogout: () => void) => {
  const result: UserMenuItemType[] = [
    {
      url: `/${routes.profile}`,
      text: 'Profile',
      icon: 'dragon'
    },
    {
      onClick: onLogout,
      text: 'Logout',
      icon: 'door'
    }
  ];
  return result;
};

export const mobileFooterLinks: LinkType[] = [
  {
    url: '/',
    text: 'Home',
    icon: 'home'
  },
  {
    url: `/${routes.search}`,
    text: 'Explore',
    icon: 'explorer'
  },
  {
    url: `/${routes.words}`,
    text: 'Vocabulary',
    icon: 'brain'
  },
  {
    url: `/${routes.games}`,
    text: 'Practice',
    icon: 'dice'
  }
];

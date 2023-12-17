import { Footer, LinkType } from './Footer';
import {
  styledPreviewDecorator,
  routerDecorator
} from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
  decorators: [styledPreviewDecorator('footer'), routerDecorator]
};

const links: LinkType[] = [
  { text: 'Review words', url: '#' },
  { text: 'Look up words', url: '#' },
  { text: 'Practice', url: '#' },
  { text: 'Profile', url: '#' }
];

const mobileLinks: LinkType[] = [
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
    url: '/vocab',
    text: 'Vocabulary',
    icon: 'brain'
  },
  {
    url: '/practice',
    text: 'Practice',
    icon: 'dice'
  }
];

export const FooterDefault = {
  args: {
    mobileLinks
  }
};

export const FooterWithLinks = {
  args: {
    mobileLinks,
    links
  }
};

export default meta;

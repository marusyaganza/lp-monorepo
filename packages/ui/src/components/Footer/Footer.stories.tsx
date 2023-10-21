import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Footer, FooterProps, LinkType } from './Footer';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Footer',
  component: Footer,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  },
  decorators: [withRouter]
};

const links: LinkType[] = [
  { text: 'Review words', url: '#' },
  { text: 'Look up words', url: '#' },
  { text: 'Practice', url: '#' },
  { text: 'Profile', url: '#' }
];

const mobileFooterLinks: LinkType[] = [
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

export const FooterDefault = (args: FooterProps) => {
  return (
    <div className="footer">
      <Footer {...args} mobileLinks={mobileFooterLinks} />
    </div>
  );
};

export const FooterWithLinks = (args: FooterProps) => {
  return (
    <div className="footer">
      <Footer {...args} links={links} mobileLinks={mobileFooterLinks} />
    </div>
  );
};

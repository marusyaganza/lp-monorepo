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

export const FooterDefault = (args: FooterProps) => {
  return (
    <div className="footer">
      <Footer {...args} />
    </div>
  );
};

export const FooterWithLinks = (args: FooterProps) => {
  return (
    <div className="footer">
      <Footer {...args} links={links} />
    </div>
  );
};

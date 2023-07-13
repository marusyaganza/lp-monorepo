import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Link, LinkProps } from './Link';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Link',
  component: Link,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  },
  decorators: [withRouter]
};

export const LinkDefault = (args: LinkProps) => {
  return (
    <div className="presentationBox">
      <Link {...args} to="/">
        Link
      </Link>
    </div>
  );
};

export const LinkButton = (args: LinkProps) => {
  return (
    <div className="presentationBox">
      <Link {...args} to="/" variant="button">
        Link
      </Link>
    </div>
  );
};

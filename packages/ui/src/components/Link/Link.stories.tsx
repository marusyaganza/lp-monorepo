import React from 'react';
import { Link } from './Link';
import {
  styledPreviewDecorator,
  routerDecorator
} from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Link> = {
  title: 'general/Link',
  component: Link,
  decorators: [styledPreviewDecorator(), routerDecorator],
  render: props => <Link {...props}>Link</Link>
};

export const LinkDefault = {
  args: {
    to: '/'
  }
};

export const LinkButton = {
  args: {
    to: '/',
    variant: 'button'
  }
};

export default meta;

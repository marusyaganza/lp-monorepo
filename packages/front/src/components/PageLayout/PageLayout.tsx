import React, { PropsWithChildren } from 'react';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { navLinks } from '../../../constants/navLinks';
import './PageLayout.css';

export const PageLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="page">
      <Header navLinks={navLinks} />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

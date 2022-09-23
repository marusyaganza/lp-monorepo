import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@lp/ui';
import { Footer } from '@lp/ui';
import { navLinks } from '../../../constants/navLinks';
import { AppContext } from '../../app-context/appContext';
import { Notification } from '../Notification/Notification';
import './PageLayout.css';

export const PageLayout = ({ children }: PropsWithChildren<unknown>) => {
  const { userId, logout } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, [userId, navigate]);

  return (
    <>
      <Notification />
      <div className="page">
        <Header onLogout={logout} navLinks={navLinks} />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
};

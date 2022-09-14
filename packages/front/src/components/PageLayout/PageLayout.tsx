import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { navLinks } from '../../../constants/navLinks';
import { AppContext } from '../../app-context/appContext';
import './PageLayout.css';

export const PageLayout = ({ children }: PropsWithChildren<unknown>) => {
  const { userId } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, [userId]);

  return (
    <>
      <div className="page">
        <Header navLinks={navLinks} />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
};

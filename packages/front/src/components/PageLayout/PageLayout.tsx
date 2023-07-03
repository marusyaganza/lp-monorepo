import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navLinks, menuItems } from './config';
import { PageSpinner } from '../PageSpinner/PageSpinner';
import { HeaderV2 } from '@lp/ui';
import { Footer } from '@lp/ui';
import { AppContext } from '../../app-context/appContext';
import { Notification } from '../Notification/Notification';
import { Language } from '../../generated/graphql';
import './PageLayout.css';

export interface PageLayoutProps {
  isLoading?: boolean;
}

export const PageLayout = ({
  children,
  isLoading
}: PropsWithChildren<PageLayoutProps>) => {
  const { userId, logout, language, saveLanguage } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, [userId, navigate]);

  const handleLanguageChange = (lang: Language) => {
    saveLanguage(lang);
  };

  return (
    <>
      <div className="page">
        <Notification />
        <HeaderV2
          navLinks={navLinks}
          language={language}
          userMenuItems={menuItems(logout)}
          onLanguageChange={handleLanguageChange}
        />
        {isLoading ? <PageSpinner /> : <main className="main">{children}</main>}
        <Footer />
      </div>
    </>
  );
};

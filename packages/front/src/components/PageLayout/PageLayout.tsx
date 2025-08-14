import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  navLinks,
  menuItems,
  mobileNavLinks,
  mobileFooterLinks
} from './config';
import { PageSpinner } from '../PageSpinner/PageSpinner';
import { Header, Footer, LinkType, cn } from '@lp/ui';
import { AppContext } from '../../app-context/appContext';
import { Notification } from '../Notification/Notification';
import { Language } from '../../generated/graphql';
import { routes } from '../../constants/routes';
import { storeData } from '../../util/localStorageUtils';
import './PageLayout.css';

export interface PageLayoutProps {
  isLoading?: boolean;
  noRedirect?: boolean;
  className?: string;
}

const FOOTER_LINKS: LinkType[] = [
  { text: 'Review words', url: `/${routes.words}` },
  { text: 'Look up words', url: `/${routes.search}` },
  { text: 'Practice', url: `/${routes.games}` }
];

export const PageLayout = ({
  children,
  isLoading,
  noRedirect,
  className
}: PropsWithChildren<PageLayoutProps>) => {
  const { userId, logout, language, saveLanguage, setNotification, isDemo } =
    useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!userId && !noRedirect) {
      if (!isDemo) {
        storeData('previousLocation', location.pathname);
      }
      navigate('/sign-in');
    }
  }, [userId, navigate, noRedirect, location.pathname, isDemo]);

  useEffect(() => {
    if (!isDemo) {
      return;
    }
    const notifyTime = 3600000 - 300000; // 55 minutes

    const timer = setTimeout(() => {
      setNotification({
        variant: 'error',
        text: 'Demo Session Expiring Soon',
        subText: 'Your demo session will expire in 5 minutes.'
      });
    }, notifyTime);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    saveLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate(`/${routes.signIn}`);
  };

  return (
    <div className="page">
      <Notification />
      {userId && (
        <Header
          mobileNavLinks={mobileNavLinks}
          navLinks={navLinks}
          language={language}
          onLogout={handleLogout}
          userMenuItems={menuItems(handleLogout)}
          onLanguageChange={handleLanguageChange}
          anonymousMode={isDemo}
        />
      )}
      {isLoading ? (
        <PageSpinner />
      ) : (
        <main data-cy="page-content" className={cn('main', className)}>
          {children}
        </main>
      )}
      {userId && (
        <Footer links={FOOTER_LINKS} mobileLinks={mobileFooterLinks} />
      )}
    </div>
  );
};

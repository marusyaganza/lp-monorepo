import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { navLinks, menuItems } from './config';
import { PageSpinner } from '../PageSpinner/PageSpinner';
import { HeaderV2 } from '@lp/ui';
import { Footer, LinkType } from '@lp/ui';
import { AppContext } from '../../app-context/appContext';
import { Notification } from '../Notification/Notification';
import { Language } from '../../generated/graphql';
import { routes } from '../../constants/routes';
import { storeData } from '../../util/localStorageUtils';
import './PageLayout.css';

export interface PageLayoutProps {
  isLoading?: boolean;
  noRedirect?: boolean;
}

const footerLinks: LinkType[] = [
  { text: 'Review words', url: `/${routes.words}` },
  { text: 'Look up words', url: `/${routes.search}` },
  { text: 'Practice', url: `/${routes.games}` },
  { text: 'Profile', url: `/${routes.profile}` }
];

export const PageLayout = ({
  children,
  isLoading,
  noRedirect
}: PropsWithChildren<PageLayoutProps>) => {
  const { userId, logout, language, saveLanguage } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!userId && !noRedirect) {
      storeData<'previousLocation'>('previousLocation', location.pathname);
      navigate('/sign-in');
    }
  }, [userId, navigate, noRedirect, location.pathname]);

  const handleLanguageChange = (lang: Language) => {
    saveLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate(`/${routes.signIn}`);
  };

  return (
    <>
      <div className="page">
        <Notification />
        {userId && (
          <HeaderV2
            navLinks={navLinks}
            language={language}
            userMenuItems={menuItems(handleLogout)}
            onLanguageChange={handleLanguageChange}
          />
        )}
        {isLoading ? <PageSpinner /> : <main className="main">{children}</main>}
        {userId && <Footer links={footerLinks} />}
      </div>
    </>
  );
};

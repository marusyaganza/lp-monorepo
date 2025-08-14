import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/classnames';

import { NavLink } from 'react-router-dom';
import { Icon, IconIdType } from '../Icon/icon';
import { UserMenu, UserMenuItemType } from '../UserMenu/UserMenu';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { Language } from '../../generated/graphql';
import logo from '../../assets/img/LogoV2.svg';
import styles from './Header.module.css';
import { Button } from '../Button/Button';

export type HeaderLinkType = {
  url: string;
  text: string;
  icon?: IconIdType;
};

export interface HeaderProps {
  /**array with all header nav links */
  navLinks: HeaderLinkType[];
  /**array with all mobile nav links */
  mobileNavLinks?: HeaderLinkType[];
  /** LanguageSelector's component change handler */
  onLanguageChange: (value: Language) => void;
  /**logout handler */
  onLogout?: () => void;
  /** currently selected value */
  language: Language;
  /**array with all menu options for the UserMenu component */
  userMenuItems: UserMenuItemType[];
  /**if true the user menu section is not displayed */
  anonymousMode?: boolean;
}

/**Header component with navigation, language selector and user menu */
export const Header = ({
  navLinks,
  mobileNavLinks,
  userMenuItems,
  onLanguageChange,
  onLogout,
  language,
  anonymousMode
}: HeaderProps) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (!ref?.current?.contains(target)) {
      setShowMobileNav(false);
    }
  };

  useEffect(() => {
    if (showMobileNav) {
      document.addEventListener('click', clickOutsideHandler);
    } else {
      document.removeEventListener('click', clickOutsideHandler);
    }

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [showMobileNav]);

  const renderMobileNav = () => {
    const links = mobileNavLinks || navLinks;
    if (!showMobileNav) {
      return;
    }
    return (
      <ul className={styles.mobileNav}>
        <NavLink to="/" className={styles.logoMobile}>
          <img className={styles.logoImg} src={logo} alt="logo" />
          <span className={styles.logoText}>Language Power</span>
        </NavLink>
        {links.map(link => {
          const { icon, text, url } = link;
          return (
            <li key={link.text}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? cn(styles.activeLink, styles.headerLink)
                    : styles.headerLink
                }
                to={url}
              >
                {icon && <Icon height={17} width={17} id={icon} />}
                {text}
              </NavLink>
            </li>
          );
        })}
        {!anonymousMode && (
          <div className={styles.logoutBlock}>
            <button className={styles.headerLink} onClick={onLogout}>
              <Icon height={17} width={17} id="door" /> Logout
            </button>
          </div>
        )}
      </ul>
    );
  };

  const renderNav = () => {
    return (
      <ul className={styles.navList}>
        {navLinks.map(navLink => {
          const { icon, text, url } = navLink;
          return (
            <li key={navLink.text}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? cn(styles.activeLink, styles.headerLink)
                    : styles.headerLink
                }
                to={url}
              >
                {icon && <Icon height={17} width={17} id={icon} />}
                {text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <nav className={styles.navigation} data-cy="headerNav">
            <div ref={ref}>
              <Button
                onClick={() => {
                  setShowMobileNav(prev => !prev);
                }}
                className={styles.mobileMenu}
                variant="icon"
                iconId="bars"
                iconHeight={30}
                iconWidth={30}
              >
                Open navigation menu
              </Button>
              {renderMobileNav()}
            </div>
            <NavLink to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </NavLink>
            {renderNav()}
          </nav>
          <div className={styles.headerMenu}>
            <LanguageSelector value={language} onChange={onLanguageChange} />
            {!anonymousMode && (
              <UserMenu className={styles.userMenu} menuItems={userMenuItems} />
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

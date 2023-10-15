import React from 'react';
import { cn } from '../../utils/classnames';

import { NavLink } from 'react-router-dom';
import { Icon, IconIdType } from '../Icon/icon';
import { UserMenu, UserMenuItemType } from '../UserMenu/UserMenu';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { Language } from '../../generated/graphql';
import logo from '../../assets/img/LogoV2.svg';
import styles from './HeaderV2.module.css';

export type HeaderLinkType = {
  url: string;
  text: string;
  icon?: IconIdType;
};

export interface HeaderV2Props {
  /**array with all header nav links */
  navLinks: HeaderLinkType[];
  /** LanguageSelector's component change handler */
  onLanguageChange: (value: Language) => void;
  /** currently selected value */
  language: Language;
  /**array with all menu options for the UserMenu component */
  userMenuItems: UserMenuItemType[];
}

/**Header component with navigation, language selector and user menu */
export const HeaderV2 = ({
  navLinks,
  userMenuItems,
  onLanguageChange,
  language
}: HeaderV2Props) => {
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
    <header className={styles.header}>
      <nav className={styles.navigation} data-cy="headerNav">
        <NavLink to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </NavLink>
        {renderNav()}
      </nav>
      <div className={styles.headerMenu}>
        <LanguageSelector value={language} onChange={onLanguageChange} />
        <UserMenu menuItems={userMenuItems} />
      </div>
    </header>
  );
};

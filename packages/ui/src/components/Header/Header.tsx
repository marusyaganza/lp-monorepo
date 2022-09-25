import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../Button/Button';
import { LinkType } from '@lp/types';

import styles from './Header.module.css';
import logo from '../../assets/img/HeaderLogo.svg';

export type HeaderProps = {
  /**array with all header nav links */
  navLinks: LinkType[];
  /**Header button onClick handler */
  onLogout?: () => void;
};

/**Header component */
export const Header = ({ navLinks, onLogout }: HeaderProps) => {

  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
         <NavLink className={styles.logo} to='/'>
          <span className={styles.hiddenText}>Language power logo</span>
          <img src={logo} />
          </NavLink>
      <ul className={styles.navItems}>
        {navLinks.map(link => {
          return (
            <li key={link.text} className={styles.navItem}>
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.headerLink
                }
              >
                {link.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
      </div>
      {onLogout && <Button className={styles.headerButton} variant='secondary' onClick={onLogout}>Sign out</Button>}
    </header>
  );
};

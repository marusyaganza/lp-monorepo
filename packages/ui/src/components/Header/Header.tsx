import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../Button/Button';
import { LinkType } from '@lp/types';

import './Header.css';

export type HeaderProps = {
  navLinks: LinkType[];
  onLogout?: () => void;
};

export const Header = ({ navLinks, onLogout }: HeaderProps) => {
  // TODO replace it to design system and use renderLinks function to render of Navlinks

  return (
    <header className="header">
      <ul className="navItems">
        {navLinks.map(link => {
          return (
            <li key={link.text} className="navItem">
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  isActive ? 'activeLink' : 'headerLink'
                }
              >
                {link.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
      {/* TODO: design normal button for logout */}
      {onLogout && <Button onClick={onLogout}>Logout</Button>}
    </header>
  );
};

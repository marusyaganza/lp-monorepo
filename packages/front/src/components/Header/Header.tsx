import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../../../ui/src/components/button/Button';
import { AppContext } from '../../app-context/appContext';

import { LinkType } from '../../../../types/src/common-types';

import './Header.css';

export type HeaderProps = {
  navLinks: LinkType[];
};

export const Header = ({ navLinks }: HeaderProps) => {
  // TODO replace it to design system and use renderLinks function to render of Navlinks

  const { logout } = useContext(AppContext);

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
      <Button onClick={logout}>Logout</Button>
    </header>
  );
};

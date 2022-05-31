import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

export type Link = {
  url: string;
  text: string;
};

export type HeaderProps = {
  navLinks: Link[];
};

export const Header = ({ navLinks }: HeaderProps) => {
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
    </header>
  );
};
